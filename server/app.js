import dotenv from "dotenv"; 
dotenv.config();

import express from 'express';
const app = express();

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

app.use(express.json());


app.get('/', function (req, res) {
  res.send('Hello World');
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port ", PORT);
    }
});