import { Order } from "../models/Order";
import api from "./apiConfig";

// Function to create a new Order in database
export const createOrder = async (orderDetails: Order) => {
  try {
    const response = await api.post(`order/createOrder`, orderDetails);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// check how many orders on specified date
export const checkOrderDate = async (deliveryDate: string) => {
  try {
    const response = await api.get(`order/checkOrderDate/${deliveryDate}`);
    if (response.status === 200 || 400) return response.data;
  } catch (err) {
    throw err;
  }
};
