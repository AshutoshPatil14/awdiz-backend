import express, { Router } from "express";
import { addProduct } from "../controllers/seller.actions.controller.js";

const sellerRoutes = Router();

import { tokenDecoder } from "../middlewares/tokenMiddleware.js";

sellerRoutes.post("/add-product", tokenDecoder, addProduct);

export default sellerRoutes;
