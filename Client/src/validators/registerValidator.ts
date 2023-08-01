import { FieldError, Resolver } from "react-hook-form";
import { registerFormValues } from "../types/registerFormValues";
import { emailValidator, passwordValidator } from "./commonValidators";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof registerFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<registerFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // check if the idNumber is empty
  if (!values.idNumber) {
    errors.idNumber = {
      type: "required",
      message: "Id Number is required",
    };
  }

  // email validator
  const emailError = emailValidator(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  // password empty validator
  const passwordError = passwordValidator(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  //check if the password is less than 6 characters.
  else if (!values.password || values.password.length < 6) {
    errors.password = {
      type: "invalid",
      message: "Password must be at least 6 characters",
    };
  }

  // check if the password and confirmPassword are the same
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = {
      type: "mismatch",
      message: "Passwords must match",
    };
  }

  // Check if the city is empty.
  if (!values.city || values.city.length === 0) {
    errors.city = {
      type: "required",
      message: "City is required",
    };
  }

  // Check if the city is empty.
  if (!values.street || values.street.length === 0) {
    errors.street = {
      type: "required",
      message: "Street is required",
    };
  }

  // Check if the city is empty.
  if (!values.firstName || values.firstName.length === 0) {
    errors.firstName = {
      type: "required",
      message: "First name is required",
    };
  }

  // Check if the city is empty.
  if (!values.lastName || values.lastName.length === 0) {
    errors.lastName = {
      type: "required",
      message: "Last name is required",
    };
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};
