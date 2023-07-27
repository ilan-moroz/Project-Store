import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  register: UseFormRegisterReturn;
  name: string;
  label: string;
  error: boolean;
  helperText: string | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  name,
  label,
  error,
  helperText,
}) => {
  return (
    <TextField
      {...register}
      id={name}
      type="password"
      label={label}
      variant="outlined"
      fullWidth
      error={error}
      helperText={helperText}
      sx={{ marginBottom: "1.5rem" }}
    />
  );
};

export default PasswordInput;
