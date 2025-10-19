import express, { Router } from "express";


const route = Router();

route.use(express.json());


route.post("/login", (req, res) => {
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

route.post("/reg", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).send("Please provide email and password");
  }
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).send("User already exists");
  }
  console.log(req.body, "req");
  // Store only the minimal user info for this example
  users.push({ email, password });
  res.status(201).send("Thanks for registering!\nYou can now log in.");
});

export default route;
