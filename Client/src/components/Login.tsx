import { Avatar, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { resolver } from "../validators/loginValidator";
import { FormValues } from "../types/loginFormValues";
import FormInput from "./FormInput";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <div className="login">
      <div className="login__header center">
        <Typography variant="h3" gutterBottom className="purpleText">
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
            register={register("username")}
            name="username"
            label="Username"
            type="text"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <FormInput
            register={register("password")}
            name="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <div className="login_form_buttons">
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Button variant="contained" color="inherit" type="reset">
              Reset
            </Button>
          </div>
        </form>
        <div>
          Don't have an account yet? <Link to="/register">Register!</Link>
        </div>
      </div>
    </div>
  );
};
