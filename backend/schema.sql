
CREATE DATABASE IF NOT EXISTS issue_tracker;
USE issue_tracker;


CREATE TABLE IF NOT EXISTS users (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,                      
  email       VARCHAR(150) NOT NULL UNIQUE,               
  password    VARCHAR(255) NOT NULL,                      
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS issues (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  user_id     INT          NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  status      ENUM('open','in_progress','closed') DEFAULT 'open',
  priority    ENUM('low','medium','high')          DEFAULT 'medium',
  assignee    VARCHAR(100),
  tags        VARCHAR(500),                                
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

