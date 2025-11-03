import express, { Router } from "express";
import { getCurrentUser, Login, Register } from "../controllers/auth.controller.js";

const route = Router();

route.use(express.json());

route.post("/login", Login);

route.post("/register", Register);

route.get("/get-current-user", getCurrentUser);

export default route;