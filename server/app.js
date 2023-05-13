import dotenv from "dotenv"; 
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

import helmet  from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

// import rateLimit from 'express-rate-limit'

// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     standardHeaders: true, 
//     legacyHeaders: false,
// });
// app.use(apiLimiter);

// const signinLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 10, 
//     standardHeaders: true,
//     legacyHeaders: false,
// });
// app.use("/auth/signin", signinLimiter);

import db from "./database/connection.js"



app.get('/', async (req, res) => {
  const users = await db.all("SELECT * FROM blog_posts");
  console.log(users);
  res.status(200).json(users);
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port ", PORT);
    }
});