import api from "./apiConfig";

// function to login the user
export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/user/login", data);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

export const checkEmailId = async (email: string, idNumber: number) => {
  try {
    const response = await api.get(`/user/checkEmailId/${email}/${idNumber}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
