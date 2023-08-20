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
export const getOverbookedDates = async () => {
  try {
    const response = await api.get(`order/getOverbookedDates`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
