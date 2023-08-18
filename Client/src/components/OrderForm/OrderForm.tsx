import { useForm } from "react-hook-form";
import { OrderFormValues } from "../../types/OrderFormValues";
import Button from "../Button/Button";
import FormInput from "../FormInput";
import { resolver } from "../../validators/orderFormValidator";
import "./orderForm.css";
import { useCities } from "../../hooks/useCities";

const OrderForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({ resolver });

  // Hook to to get all cities from api
  const cities = useCities();

  const onSubmit = handleSubmit(async data => {
    console.log(data);
    reset();
  });

  return (
    <div className="order">
      <h1 className="order__header-1 header purpleText">Order</h1>
      <h2 className="order__header-2 header purpleText">Shipping Details</h2>
      <div className="order__form">
        <form onSubmit={onSubmit}>
          <FormInput
            register={register("city")}
            name="city"
            label="City"
            type="select"
            selectOptions={cities}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <FormInput
            register={register("street")}
            name="street"
            label="Street"
            type="text"
            error={!!errors.street}
            helperText={errors.street?.message}
          />
          <FormInput
            register={register("shippingDate")}
            name="shippingDate"
            label="Shipping Date"
            type="date"
            error={!!errors.shippingDate}
            helperText={errors.shippingDate?.message}
          />
          <h2 className="order__header-3 header purpleText">Payments</h2>
          <FormInput
            register={register("creditCard")}
            name="creditCard"
            label="creditCard"
            type="text"
            error={!!errors.creditCard}
            helperText={errors.creditCard?.message}
          />
          <div className="order__form--button">
            <Button
              type="submit"
              text="Finish Order"
              color=" rgb(103, 32, 180)"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
