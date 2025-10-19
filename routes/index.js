import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.actions.js"


const mainRouter = Router();

mainRouter.use("/auth", authRoutes)
mainRouter.use("/user", userRoutes)







export default mainRouter;
