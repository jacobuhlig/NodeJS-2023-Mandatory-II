import dotenv from "dotenv";
dotenv.config();

import connection from './connection.js';

async function initializeDatabase() {
  try {
    await connection.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY,
        title TEXT,
        content TEXT
      )
    `);

    await connection.run(`
      INSERT INTO blog_posts (title, content) 
      VALUES (?, ?)
    `, ['First Post', 'This is the first blog post.']);

    await connection.run(`
      INSERT INTO blog_posts (title, content) 
      VALUES (?, ?)
    `, ['Second Post', 'This is the second blog post.']);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
