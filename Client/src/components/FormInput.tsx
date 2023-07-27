import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  register: UseFormRegisterReturn;
  name: string;
  label: string;
  error: boolean;
  type: string;
  helperText: string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  register,
  name,
  label,
  error,
  type,
  helperText,
}) => {
  return (
    <TextField
      {...register}
      id={name}
      type={type}
      label={label}
      variant="outlined"
      fullWidth
      error={error}
      helperText={helperText}
      sx={{ marginBottom: "1.5rem" }}
    />
  );
};

export default FormInput;
