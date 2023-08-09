import api from "./apiConfig";

// api post request to add product
export const addProduct = async (product: any) => {
  try {
    const response = await api.post(`product/addProduct`, product);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// api request to get all products from database
export const getProducts = async () => {
  try {
    const response = await api.get("product/getAllProducts");
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
