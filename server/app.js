import dotenv from "dotenv"; 
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

import helmet  from "helmet";
app.use(helmet());

// ["http://localhost:5173"]
import cors from "cors";
app.use(cors({
    origin: true,
    credentials: true
}));

import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
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

// Additional middlewares to parse form data
// app.use(express.urlencoded({ extended: true }));

// Middleware
// function authorizationGuard(req, res, next) {
//     if (!req.session.user) {
//         return res.status(404).json({ message: "Access not permitted" });
//     }
//     next();
// }

// app.use("/api/home", authorizationGuard);

// Routes

import routerSignin from "./routers/routerSignin.js";
app.use(routerSignin);

import routerHome from "./routers/routerHome.js";
app.use(routerHome);




const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port ", PORT);
    }
});