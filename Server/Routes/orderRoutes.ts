import express from "express";
import {
  createOrder,
  getOrdersAmount,
  getOverbookedDates,
} from "../controllers/orderController";

const orderRouter = express.Router();

// create new order
orderRouter.post("/createOrder", createOrder);
orderRouter.get("/getOverbookedDates", getOverbookedDates);
orderRouter.get("/getOrdersAmount", getOrdersAmount);

export default orderRouter;
