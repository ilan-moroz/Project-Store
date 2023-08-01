import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

// Define the type for the props the component will receive
interface FormInputProps {
  register?: UseFormRegisterReturn;
  id: string;
  label: string;
  error: boolean;
  type: string;
  helperText: string | undefined;
}

//reusable form input component
const FormInput: React.FC<FormInputProps> = ({
  register,
  id,
  label,
  error,
  type,
  helperText,
}) => {
  return (
    <TextField
      {...register}
      id={id}
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
