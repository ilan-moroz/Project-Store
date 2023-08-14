import api from "./apiConfig";

// Function to check if user has an cart and if no create it
export const checkShoppingCart = async (userId: string) => {
  try {
    const response = await api.get(`cart/checkShoppingCart/${userId}`);
    if (response.status === 200 || 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// function to add item to a cart
export const addItemToCart = async (cartId: string, cartItem: {}) => {
  try {
    const response = await api.post(`cart/addItemToCart/${cartId}`, cartItem);
    if (response.status === 201 || 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// function to get all cart items
export const getCartItems = async (cartId: string) => {
  try {
    const response = await api.get(`cart/getCartItems/${cartId}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
