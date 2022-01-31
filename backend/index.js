import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});