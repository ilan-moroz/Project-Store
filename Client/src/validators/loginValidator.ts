import { FieldError, Resolver } from "react-hook-form";
import { loginFormValues } from "../types/loginFormValues";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof loginFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<loginFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // check if the email is empty or only whitespace
  if (!values.email || values.email.trim() === "") {
    errors.email = {
      type: "required",
      message: "Email is required",
    };
  } // verify that the email has the correct format
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = {
      type: "pattern",
      message: "Invalid email format",
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
