import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;


const app = express();

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'race_condition',
  password: 'root',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the PostgreSQL database');
  release();
});

app.get('/', (req, res) => {
  res.send('Welcome to the Express app with PostgreSQL!');
});

app.patch('/buy/tickets/:id/user/:userId', async (req, res) => {
  const { id,userId } = req.params;
  try {
    console.log('This is user: ', userId, 'At time: ',new Date() );
    const client = await pool.connect();
    await client.query('begin transaction');
    try {      
      // const ticketResult = await client.query('select * from tickets where id = $1', [id]);
      
      // if (ticketResult.rows.length === 0) {
      //   return res.status(404).json({ error: 'Ticket not found' });
      // }      
      // const isSold=ticketResult.rows[0].is_sold;
      // console.log('This is isSold: ', isSold, 'for user: ', userId);
      // if (isSold) {
      //   return res.status(400).json({ error: 'Ticket has been sold' });
      // }
      const updatedTicketResult = await client.query(
          'update tickets set is_sold = true, user_id=$1 where id = $2 and is_sold=false;',
          [userId,id]
      );
      console.log('This is updated ticket for user id: ',userId ,' ', updatedTicketResult);
      
      await client.query('COMMIT');
      
      const updatedTicket = updatedTicketResult.rows[0];
      res.json({
        message: 'Tickets successfully purchased',
        ticket: updatedTicket,
      });
    } catch (err) {
      await client.query('rollback;');
      console.log('Rolling back');
      console.error('Error buying tickets:', err.stack);
      res.status(500).json({ error: 'Failed to process ticket purchase' });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Database connection error:', err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

