import express from "express";
import {
  createOrder,
  getLastOrder,
  getOrdersAmount,
  getOverbookedDates,
} from "../controllers/orderController";

const orderRouter = express.Router();

// create new order
orderRouter.post("/createOrder", createOrder);
orderRouter.get("/getOverbookedDates", getOverbookedDates);
orderRouter.get("/getOrdersAmount", getOrdersAmount);
orderRouter.get("/getLastOrder/:userId", getLastOrder);

export default orderRouter;
