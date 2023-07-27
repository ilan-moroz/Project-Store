import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  register: UseFormRegisterReturn;
  name: string;
  label: string;
  error: boolean;
  helperText: string | undefined;
}

const TextInput: React.FC<TextInputProps> = ({
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
      type="text"
      label={label}
      variant="outlined"
      fullWidth
      error={error}
      helperText={helperText}
      sx={{ marginBottom: "1.5rem" }}
    />
  );
};

export default TextInput;
