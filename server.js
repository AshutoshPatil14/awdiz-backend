import express from "express";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send(`Hello, This is ${process.env.MY_NAME}!`);
});

app.post("/greet", (req, res) => {
  res.send("Hello, Ashutosh Patil");
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
