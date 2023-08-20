import saveAs from "file-saver";
import { Order } from "../models/Order";
import { useCartState } from "./useCartState";
import { useProductState } from "./useProductState";

export const useReceipt = () => {
  const { cartItems } = useCartState();
  const { products } = useProductState();

  const orderItems = products.filter(product =>
    cartItems.some(cartItem => cartItem.productId === product._id)
  );

  const itemsList = orderItems
    .map(item => `Product: ${item.productName}, Price: ${item.price}`)
    .join("\n");

  const downloadReceipt = (orderDetails: Order) => {
    const receiptText = `
            Receipt
----------------------------------
Date: ${new Date().toLocaleString()}
Delivery Date:${orderDetails.deliveryDate}
Delivery City:${orderDetails.deliveryCity}
Delivery Street:${orderDetails.deliveryStreet}
Last 4 digits of payment method: ${orderDetails.paymentMethodLast4Digits}
        
${itemsList}

Total Amount: \u20AA${orderDetails.finalPrice}
        
      
Thank you for shopping with us! 🙂`;

    const blob = new Blob([receiptText], { type: "text/plain" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
