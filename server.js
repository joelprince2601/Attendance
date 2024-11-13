const fs = require('fs');
const http = require('http');
const url = require('url');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-class') {
    let body = '';

    // Collect the data from the request
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { classname, classnumber, slot } = parse(body);
      
      // Save the details in a file
      const classData = `classname: ${classname}\nclassnumber: ${classnumber}\nslot: ${slot}\n\n`;

      fs.appendFile('info.txt', classData, (err) => {
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
