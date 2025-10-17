import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

var users = [];

app.get("/", (req, res) => {
  res.send(`Hello, This is ${process.env.MY_NAME}!`);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("Please provide email and password");
  }
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.send("User not found");
  }
  if (user.password !== password) {
    return res.send("Incorrect password");
  }
  console.log(req.body, "req");
  res.send("Hello, You're logged in!");
});

app.post("/reg", (req, res) => {
  const existingUser = users.find((user) => user.email === req.body.email);
  if (existingUser) {
    return res.send("User already exists");
  }
  console.log(req.body, "req");
  users.push(req.body);
  res.send("Thanks for registering!\nYou can now log in.");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
