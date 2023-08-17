import { FieldError, Resolver } from "react-hook-form";
import { OrderFormValues } from "../types/OrderFormValues";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof OrderFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<OrderFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // Check if the productName is empty.
  if (!values.city || values.city.length === 0) {
    errors.city = {
      type: "required",
      message: "City name is required",
    };
  }

  // Check if the Category is empty.
  if (!values.street || values.street.length === 0) {
    errors.street = {
      type: "required",
      message: "Street name is required",
    };
  }

  // Check if the Category is empty.
  if (!values.shippingDate || values.shippingDate.length === 0) {
    errors.shippingDate = {
      type: "required",
      message: "Shipping date name is required",
    };
  }

  // Check if the image is empty.
  if (!values.creditCard) {
    errors.creditCard = {
      type: "required",
      message: "Credit card is required",
    };
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};
