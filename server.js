import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { tokenDecoder } from "./middlewares/tokenMiddleware.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { origin: "http://localhost:5173", credentials: true };

app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Hello, This is ${process.env.MY_NAME}!`);
});

app.use("/api/v1", tokenDecoder, mainRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Hello ${process.env.MY_NAME}, Connected to the DB!`));

app.listen(3000, () => {
  console.log("The server is running on port http://localhost:3000/");
});
