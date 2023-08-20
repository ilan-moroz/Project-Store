import saveAs from "file-saver";
import { Order } from "../models/Order";
import { useCartState } from "./useCartState";
import { useProductState } from "./useProductState";
import moment from "moment";

export const useReceipt = () => {
  const { cartItems } = useCartState();
  const { products } = useProductState();

  const orderItems = products.filter(product =>
    cartItems.some(cartItem => cartItem.productId === product._id)
  );

  const itemsList = orderItems
    .map(
      item =>
        `${item.productName.padEnd(20, " ")} : \u20AA${item.price.toFixed(2)}`
    )
    .join("\n");

  const downloadReceipt = (orderDetails: Order) => {
    const orderDate = moment().format("DD/MM/YYYY, HH:mm:ss");

    const deliveryDate = moment(orderDetails.deliveryDate).format("DD/MM/YYYY");

    const receiptText = `
Receipt
----------------------------------
Order Date   : ${orderDate}
Delivery Date: ${deliveryDate}
City         : ${orderDetails.deliveryCity}
Street       : ${orderDetails.deliveryStreet}
Payment      : **** **** **** ${orderDetails.paymentMethodLast4Digits}
          
Items:
${itemsList}
  
Total Amount : \u20AA${orderDetails.finalPrice.toFixed(2)}
          
Thank you for shopping with us! 🙂`;

    const blob = new Blob([receiptText], { type: "text/plain" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
