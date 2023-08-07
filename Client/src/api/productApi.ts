import api from "./apiConfig";

export const addProduct = async (product: any) => {
  try {
    const response = await api.post(`product/addProduct`, product);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};
