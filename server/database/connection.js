import dotenv from "dotenv";
dotenv.config();

import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

// Initiate the connection and assign it to db
(async () => {
  db = await open({
    filename: process.env.DB_FILENAME,
    driver: sqlite3.Database
  });

  console.log(`Database connection established!`);
})();

// Export a getter for the database connection
// The function will wait for db to be defined and then return it
export default async function getDb() {
  while(!db) {
    // Wait for 50ms before checking again
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return db;
}
