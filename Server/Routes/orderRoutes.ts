import express from "express";
import {
  createOrder,
  getOverbookedDates,
} from "../controllers/orderController";

const orderRouter = express.Router();

// create new order
orderRouter.post("/createOrder", createOrder);
orderRouter.get("/getOverbookedDates", getOverbookedDates);

export default orderRouter;
