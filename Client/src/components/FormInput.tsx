import { TextField, MenuItem, Box } from "@mui/material";
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
        {selectOptions.map((option: any, index: number) => (
          <MenuItem
            // check if an array or object is provided
            key={typeof option === "object" ? option._id : index}
            value={typeof option === "object" ? option._id : option}
          >
            {typeof option === "object"
              ? option.categoryName
              : capitalizeWords(option)}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  // If it's a file or date type input
  if (type === "file" || type === "date") {
    return (
      <Box sx={{ marginBottom: "1.5rem" }}>
        <label htmlFor={name}>{label}</label>
        <TextField
          {...register}
          type={type}
          name={name}
          variant="outlined"
          fullWidth
          error={error}
          helperText={helperText}
        />
      </Box>
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
      inputProps={{ step: "0.01" }}
      sx={{ marginBottom: "1.5rem" }}
    />
  );
};

export default FormInput;
