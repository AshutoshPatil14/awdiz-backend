import express, { Router } from "express";
import { Login, Register } from "../controllers/auth.controller.js";

const route = Router();

route.use(express.json());

route.post("/login", Login);

route.post("/reg", Register);

export default route;