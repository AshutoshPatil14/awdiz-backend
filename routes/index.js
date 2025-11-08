import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.actions.js";
import sellerRoutes from "./seller.routes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRoutes);
mainRouter.use("/user", userRoutes);
mainRouter.use("/seller", sellerRoutes);

export default mainRouter;
