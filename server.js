const fs = require('fs');
const { parse } = require('querystring');
const { Client } = require('pg');
const path = require('path');

// Set up PostgreSQL connection
const client = new Client({
  user: 'postgres',        
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

const filePath = path.join(__dirname, 'info.txt');

// Watch for changes in info.txt
fs.watch(filePath, (eventType, filename) => {
  if (eventType === 'change') {
    // Read the updated file content
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      // Process the file content and insert into the database
      const lines = data.split('\n').filter(line => line.trim() !== '');
      let classDetails = {};

      lines.forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        classDetails[key.toLowerCase()] = value;
      });

      // Insert the data into PostgreSQL
      const { classname, classnumber, slot } = classDetails;

      if (classname && classnumber && slot) {
        const query = 'INSERT INTO classes (classname, classnumber, slot) VALUES ($1, $2, $3)';
        const values = [classname, classnumber, slot];

        client.query(query, values)
          .then(() => console.log('Data inserted into database'))
          .catch(err => console.error('Error inserting data:', err));
      }
    });
  }
});

const server = require('http').createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-class') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { classname, classnumber, slot } = parse(body);

      // Save class details in info.txt
      const classData = `classname: ${classname}\nclassnumber: ${classnumber}\nslot: ${slot}\n\n`;

      fs.appendFile(filePath, classData, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error saving the data');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Class details saved successfully');
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
