import { useForm } from "react-hook-form";
import { OrderFormValues } from "../../types/OrderFormValues";
import Button from "../Button/Button";
import FormInput from "../FormInput";
import { resolver } from "../../validators/orderFormValidator";
import "./orderForm.css";
import { useUserState } from "../../hooks/useUserState";
import React from "react";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { createOrder } from "../../api/orderApi";
import { Order } from "../../models/Order";
import { useCartState } from "../../hooks/useCartState";

const OrderForm = () => {
  // custom hook to get user from the Redux store
  const { user } = useUserState();
  const { cartId, cartItems } = useCartState();
  const finalPrice = cartItems.reduce((acc, item) => {
    return acc + item.generalPrice;
  }, 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver,
    defaultValues: {
      deliveryCity: capitalizeWords(user?.city ?? ""),
      deliveryStreet: capitalizeWords(user?.street ?? ""),
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      const last4digits = data.paymentMethodLast4Digits.slice(-4);

      const orderDetails = {
        ...data,
        customerId: user?._id ?? "",
        paymentMethodLast4Digits: last4digits,
        cartId: cartId,
        finalPrice: finalPrice,
      };
      const response = await createOrder(orderDetails);
      console.log(response);
      reset();
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="order">
      <h1 className="order__header-1 header purpleText">Order</h1>
      <h2 className="order__header-2 header purpleText">Shipping Details</h2>
      <div className="order__form">
        <form onSubmit={onSubmit}>
          <FormInput
            register={register("deliveryCity")}
            name="deliveryCity"
            label="City"
            type="text"
            error={!!errors.deliveryCity}
            helperText={errors.deliveryCity?.message}
          />
          <FormInput
            register={register("deliveryStreet")}
            name="deliveryStreet"
            label="Street"
            type="text"
            error={!!errors.deliveryStreet}
            helperText={errors.deliveryStreet?.message}
          />
          <FormInput
            register={register("deliveryDate")}
            name="deliveryDate"
            label="Delivery Date"
            type="date"
            error={!!errors.deliveryDate}
            helperText={errors.deliveryDate?.message}
          />
          <h2 className="order__header-3 header purpleText">Payments</h2>
          <FormInput
            register={register("paymentMethodLast4Digits")}
            name="paymentMethodLast4Digits"
            label="Credit Card"
            type="text"
            error={!!errors.paymentMethodLast4Digits}
            helperText={errors.paymentMethodLast4Digits?.message}
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

export default React.memo(OrderForm);
