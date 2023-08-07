import api from "./apiConfig";

// make api post request to add product
export const addProduct = async (product: any) => {
  try {
    const response = await api.post(`product/addProduct`, product);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};
