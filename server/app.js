import dotenv from "dotenv"; 
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

import helmet  from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({
    origin: [process.env.PORT_CLIENT],
    credentials: true
}));

import session from "express-session";



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false } 
}));



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