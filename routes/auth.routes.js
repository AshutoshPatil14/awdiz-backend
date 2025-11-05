import express, { Router } from "express";
import { getCurrentUser, Login, Register, Logout } from "../controllers/auth.controller.js";
import { tokenDecoder } from "../middlewares/tokenMiddleware.js";

const route = Router();

route.use(express.json());

route.post("/login", Login);

route.post("/register", Register);

// Logout route clears auth cookie
route.post("/logout", Logout);

route.get("/get-current-user", tokenDecoder, getCurrentUser);

export default route;
