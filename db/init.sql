\c haufechallenge;
CREATE TABLE IF NOT EXISTS users (
  user_id serial PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  user_role VARCHAR(100) NOT NULL,
  user_password VARCHAR(200) NOT NULL
);
INSERT INTO users (username, user_role, user_password) VALUES ('testUser', 'internal', 'test123');