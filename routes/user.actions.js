import express, { Router } from "express";

const route = Router();

route.use(express.json());

var newUsers = [
  { id: 1, name: "Ted", age: 28 },
  { id: 2, name: "Marshall", age: 32 },
  { id: 3, name: "Robin", age: 30 },
];

route.get("/new-users", (req, res) => {
  res.send(newUsers);
});

route.patch("/new-users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age } = req.body;
  const user = newUsers.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (name) {
    user.name = name;
  }
  if (age) {
    user.age = age;
  }
  res.send("User updated successfully");
});

route.delete("/new-users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = newUsers.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }
  newUsers.splice(userIndex, 1);
  res.send("User deleted successfully");
});

route.get("/cart", (req, res) => {
  res.send("This is a CART.");
});

export default route;
