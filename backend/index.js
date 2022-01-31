import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();
const port = 3000;
const { Pool } = pg;

app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

const checkIfUserExists = async (username) => {
  return new Promise(resolve => {
    pool.query(`SELECT * FROM users WHERE username = '${username}'`, (error, results) => {
      if(error){
        throw error
      }
      return resolve(results.rowCount > 0);
    });
  })
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Register endpoint
app.post('/register', (req, res) => {
  const salt_rounds = 10;
  const username_pattern = /^([a-zA-Z0-9_]+)$/
  const default_role = 'internal';
  const { username, password } = req.body;

  // All fields are mandatory
  if(!username || !password){
    return res.status(400).json({status: 'failed', message: 'All fields are mandatory'});
  }

  // Restrict password length to 200 as in the database design
  if(password && password.length > 200){
    return res.status(400).json({status: 'failed', message: 'Password must be max 200 characters'});
  }

  // Restrict username length to 50 as in the database design
  if(username && username.length > 50){
    return res.status(400).json({status: 'failed', message: 'Username must be max 50 characters'});
  }
  // Allow only letters, numbers and underscore for username
  if(!username_pattern.test(username)){
    return res.status(400).json({status: 'failed', message: 'Only letters, numbers and underscore allowed.'})
  }

  // check if user already exists
  checkIfUserExists(username).then(exists => {
    if(exists){
      return res.status(400).json({ status: 'failed', message: 'Username is taken.' });
    }
    // hash the password
    bcrypt.genSalt(salt_rounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Insert the user
        pool.query(`INSERT INTO users(username, user_password, user_role) VALUES($1, $2, $3)`, [username, hash, default_role], (error, results) => {
          if(error){
            res.send({status: 'failed', message: 'There was an error while inserting user in the database.'});
          } else {
            res.send({status: 'success', message: 'User created successfully.'});
          }
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});