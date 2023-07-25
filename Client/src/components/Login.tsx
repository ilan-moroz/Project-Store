import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Resolver, useForm, FieldError } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import "../styles/login.css";
import { Link } from "react-router-dom";

// defining type for the form data.
type FormValues = {
  username: string;
  password: string;
};

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof FormValues]?: FieldError;
};

//function that validates form data.
const resolver: Resolver<FormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // check if the username is empty or only whitespace
  if (!values.username || values.username.trim() === "") {
    errors.username = {
      type: "required",
      message: "Username is required",
    };
  }

  //check if the password is less than 6 characters.
  if (!values.password || values.password.length < 6) {
    errors.password = {
      type: "invalid",
      message: "Password must be at least 6 characters",
    };
  }

  // check if the password is empty.
  if (!values.password || values.password.length === 0) {
    errors.password = {
      type: "required",
      message: "Password is required",
    };
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

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
