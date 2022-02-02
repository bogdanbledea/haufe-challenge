import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 3000;
const { Pool } = pg;
const salt_rounds = 10;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

const generateToken = (user) => {
  const token = jwt.sign(
    { user_id: user.user_id, username: user.username, role: user.user_role },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return token;
}

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

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // All fields are mandatory
  if(!username || !password){
    return res.status(400).json({status: 'failed', message: 'All fields are mandatory'});
  }

  checkIfUserExists(username).then(exists => {
    if(exists){
      pool.query(`SELECT * FROM users WHERE username = '${username}'`, (error, results) => {
        if(results.rowCount === 1){
          const hash_password = results.rows[0].user_password;
          bcrypt.compare(password, hash_password, function(err, result) {
            if(result){
              const token = generateToken(results.rows[0]);
              return res.status(200).json({status: 'success', message: 'Login successful.', token: token});
            } else {
              return res.status(400).json({status: 'failed', message: 'Password incorrect.'});
            }
        });
        }
      })
    } else {
      return res.status(400).json({status: 'failed', message: 'User does not exist.'});
    }
  });
})

// Register endpoint
app.post('/register', (req, res) => {
  
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