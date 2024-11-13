const fs = require('fs');
const { parse } = require('querystring');
const { Client } = require('pg');
const http = require('http');

// PostgreSQL connection setup
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

// Helper function to create a student table for each slot
const createStudentTableForSlot = async (slot) => {
  const tableName = `students_${slot.toLowerCase()}`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      registration_number SERIAL PRIMARY KEY,
      student_name VARCHAR(100),
      student_email VARCHAR(100) UNIQUE
    );
  `;
  await client.query(createTableQuery);
  console.log(`Student table ${tableName} created for slot ${slot}`);
};

// Route to save class information and create a student table for each slot
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-class') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { classname, classnumber, slot } = parse(body);

      // Log incoming request body to verify data
      console.log('Received /save-class data:', { classname, classnumber, slot });

      try {
        const insertClassQuery = `
          INSERT INTO classes (classname, classnumber, slot)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const result = await client.query(insertClassQuery, [classname, classnumber, slot]);
        console.log(`Class saved: ${result.rows[0]}`);

        // Create slot-specific student table
        await createStudentTableForSlot(slot);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Class information saved and student table created');
      } catch (error) {
        console.error('Error in /save-class:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error saving class information: ${error.message}`);
      }
    });
  } else if (req.method === 'POST' && req.url === '/add-student') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { slot, registration_number, student_name, student_email } = parse(body);
      const tableName = `students_${slot.toLowerCase()}`;

      // Log incoming request body to verify data
      console.log('Received /add-student data:', { slot, registration_number, student_name, student_email });

      try {
        // Ensure the student table exists for the slot
        await createStudentTableForSlot(slot);

        const insertStudentQuery = `
          INSERT INTO ${tableName} (registration_number, student_name, student_email)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const result = await client.query(insertStudentQuery, [registration_number, student_name, student_email]);
        console.log(`Student added to ${tableName}: ${result.rows[0]}`);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Student added successfully');
      } catch (error) {
        console.error('Error in /add-student:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error adding student: ${error.message}`);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
