import { Button, TextField } from "@mui/material";
import { Resolver, useForm, FieldError } from "react-hook-form";
import "../styles/login.css";

type FormValues = {
  username: string;
  password: string;
};

type FormErrors = {
  [K in keyof FormValues]?: FieldError;
};

const resolver: Resolver<FormValues> = async values => {
  const errors: FormErrors = {};

  if (!values.username || values.username.trim() === "") {
    errors.username = {
      type: "required",
      message: "Username is required",
    };
  }

  if (!values.password || values.password.length < 6) {
    errors.password = {
      type: "invalid",
      message: "Password must be at least 6 characters",
    };
  }

  if (!values.password || values.password.length === 0) {
    errors.password = {
      type: "required",
      message: "Password is required",
    };
  }

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
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <div className="login">
      <h1>Login</h1>
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
          />
          <div className="login_form_buttons">
            <Button variant="contained" fullWidth type="submit">
              Login
            </Button>
            <Button variant="contained" color="inherit" fullWidth type="reset">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
