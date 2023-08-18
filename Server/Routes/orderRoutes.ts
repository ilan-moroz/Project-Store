import express from "express";
import { createOrder } from "../controllers/orderController";

const orderRouter = express.Router();

// create new order
orderRouter.post("/createOrder", createOrder);

export default orderRouter;
