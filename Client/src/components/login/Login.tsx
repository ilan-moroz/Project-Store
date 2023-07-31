import { Avatar, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import "./login.css";
import { Link } from "react-router-dom";
import { resolver } from "../../validators/loginValidator";
import { FormValues } from "../../types/loginFormValues";
import FormInput from "../FormInput";
import { login } from "../../api/userApi";
import { toast } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(async data => {
    try {
      await login(data);
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  });

  return (
    <div className="login">
      <div className="login__header center">
        <Typography
          variant="h3"
          gutterBottom
          className="purpleText login__header--text"
        >
          Login
        </Typography>
        <Avatar
          sx={{ marginBottom: "3rem", bgcolor: "rgb(103, 32, 180)" }}
          className="purpleText"
        >
          <LoginIcon />
        </Avatar>
      </div>
      <div className="login__form">
        <form onSubmit={onSubmit}>
          <FormInput
            register={register("email")}
            name="email"
            label="Email"
            type="text"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <FormInput
            register={register("password")}
            name="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <div className="login__form--buttons">
            <button className="login_submit-button" type="submit">
              login
            </button>
            <button className="login_reset-button" type="reset">
              reset
            </button>
          </div>
        </form>
        <div className="login__registerLink ">
          Don't have an account yet? <Link to="/register">Register!</Link>
        </div>
      </div>
    </div>
  );
};
