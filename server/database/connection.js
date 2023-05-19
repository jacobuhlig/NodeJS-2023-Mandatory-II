"use strict";

import dotenv from "dotenv";
dotenv.config();

import { open } from "sqlite";
import sqlite3 from "sqlite3";

let db;

(async () => {
  try {
    db = await open({
      filename: process.env.DB_FILENAME,
      driver: sqlite3.Database
    });

    console.log(`Database connection established!`);
  } catch (error) {
    console.log("There was an error connecting to the database: ", error);
  }
})();

export default async function getDb() {
  while(!db) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return db;
}