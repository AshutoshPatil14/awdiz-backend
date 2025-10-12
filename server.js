import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/greet", (req, res) => {
  res.send("Hello, Ashutosh Patil");
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
