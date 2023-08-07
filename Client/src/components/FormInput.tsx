import { TextField, MenuItem } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";
import { capitalizeWords } from "../utils/capitalizeWords";

interface FormInputProps {
  register?: UseFormRegisterReturn;
  name: string;
  label: string;
  error: boolean;
  type: string;
  helperText: string | undefined;
  selectOptions?: string[]; // array of select options
}

// reusable form input component
const FormInput: React.FC<FormInputProps> = ({
  register,
  name,
  label,
  error,
  type,
  helperText,
  selectOptions,
}) => {
  // If it's a select type input
  if (type === "select" && selectOptions) {
    return (
      <TextField
        {...register}
        name={name}
        select
        label={label}
        variant="outlined"
        fullWidth
        defaultValue=""
        error={error}
        helperText={helperText}
        sx={{ marginBottom: "1.5rem" }}
      >
        {selectOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {capitalizeWords(option)}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  // If it's not a select type input
  return (
    <TextField
      {...register}
      name={name}
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
