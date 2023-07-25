import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export const Login = () => {
  // use form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          placeholder="Example: JohnDoe23"
          autoFocus
          {...register("username", {
            required: true,
          })}
          error={Boolean(errors.username)}
          helperText={errors.username && "Username is required"}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          placeholder="Example: 12345678"
          autoFocus
          {...register("password", {
            required: true,
          })}
          error={Boolean(errors.password)}
          helperText={errors.password && "Password is required"}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
