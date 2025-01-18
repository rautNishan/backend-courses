import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'race_condition',
  password: 'test',
  port: 5432,
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the PostgreSQL database');
  release();
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Express app with PostgreSQL!');
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

