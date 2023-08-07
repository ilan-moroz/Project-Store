import { FieldError, Resolver } from "react-hook-form";
import { AddProductFormValues } from "../types/AddProductFormValues";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof AddProductFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<AddProductFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // Check if the productName is empty.
  if (!values.productName || values.productName.length === 0) {
    errors.productName = {
      type: "required",
      message: "Product name is required",
    };
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};
