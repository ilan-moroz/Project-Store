import express from "express";
import { checkOrderDate, createOrder } from "../controllers/orderController";

const orderRouter = express.Router();

// create new order
orderRouter.post("/createOrder", createOrder);
orderRouter.get("/checkOrderDate/:date", checkOrderDate);

export default orderRouter;
