import { FieldError, Resolver } from "react-hook-form";
import { FormValues } from "../types/registerFormValues";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof FormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<FormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  //   // check if the username is empty or only whitespace
  //   if (!values.username || values.username.trim() === "") {
  //     errors.username = {
  //       type: "required",
  //       message: "Username is required",
  //     };
  //   }

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
