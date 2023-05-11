import dotenv from "dotenv";
dotenv.config();

import sqlite3 from "sqlite3";
import { open } from "sqlite";

const connection = await open({
    filename: process.env.DB_FILENAME,
    driver: sqlite3.Database
});

console.log(`Database connection established!`);

export default connection;