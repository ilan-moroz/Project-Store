import api from "./apiConfig";

// Function to check if user has an cart and if no create it
export const checkShoppingCart = async (userId: string) => {
  try {
    const response = await api.get(`cart/checkShoppingCart:${userId}`);
    if (response.status === 200 || 201) return response.data;
  } catch (err) {
    throw err;
  }
};
