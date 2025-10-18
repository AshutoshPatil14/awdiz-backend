import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/users", (req, res) => {
  res.send(users);
});

var newUsers = [
  { id: 1, name: "Ted", age: 28 },
  { id: 2, name: "Marshall", age: 32 },
  { id: 3, name: "Robin", age: 30 },
];

app.get("/new-users", (req, res) => {
  res.send(newUsers);
})

app.patch("/new-users/:id", (req, res) => {
  const userId = parseInt(req.params.id)
  const {name, age} = req.body
  const user = newUsers.find(user => user.id === userId)
  if (!user) {
    return res.status(404).send("User not found")
  }
  if (name) {
    user.name = name
  }
  if (age) {
    user.age = age
  }
  res.send("User updated successfully")
})

app.delete("/new-users/:id", (req, res) => {
  const userId = parseInt(req.params.id)
  const userIndex = newUsers.findIndex(user => user.id === userId)
  if (userIndex === -1) {
    return res.status(404).send("User not found")
  }
  newUsers.splice(userIndex, 1)
  res.send("User deleted successfully")
})


app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
