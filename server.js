import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Hello, This is ${process.env.MY_NAME}!`);
});

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
