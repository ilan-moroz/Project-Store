import { useState } from "react";
import { checkEmailId, registerUser } from "../api/userApi";
import { setLoginAction } from "../redux/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";

export function useRegister() {
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: 0,
    password: "",
    city: "",
    street: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstStepSubmit = async (data: User) => {
    try {
      const response = await checkEmailId(data.email, data.idNumber);
      if (response) return true;
    } catch (err) {
      throw err;
    }
    return false;
  };

  const secondStepSubmit = (data: User) => {
    setFormData(data);
    return true;
  };

  const finalSubmit = async () => {
    try {
      const response = await registerUser(formData);
      if (response) {
        dispatch(setLoginAction(response.user, response.token));
        navigate("/");
      }
    } catch (err) {
      throw err;
    }
  };

  return { firstStepSubmit, secondStepSubmit, finalSubmit };
}
