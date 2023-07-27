import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { FormValues, resolver } from "../validators/loginValidator";

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
          <TextField
            {...register("username")}
            id="username"
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{ marginBottom: "1.5rem" }}
          />
          <TextField
            {...register("password")}
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ marginBottom: "1.5rem" }}
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
