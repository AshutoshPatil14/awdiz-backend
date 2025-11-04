import express, { Router } from "express";
import { getCurrentUser, Login, Register } from "../controllers/auth.controller.js";

const route = Router();

route.use(express.json());

route.post("/login", Login);

route.post("/register", Register);

import { tokenDecoder } from "../middlewares/tokenMiddleware.js";

route.get("/get-current-user", tokenDecoder, getCurrentUser);

export default route;