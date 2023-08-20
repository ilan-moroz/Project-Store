import saveAs from "file-saver";
import { Order } from "../models/Order";
import { useCartState } from "./useCartState";
import { useProductState } from "./useProductState";
import moment from "moment";

export const useReceipt = () => {
  // Fetch cart items using the custom hook
  const { cartItems } = useCartState();
  // Fetch products using the custom hook
  const { products } = useProductState();

  // Filter products that match the cart items based on productId
  const orderItems = products.filter(product =>
    cartItems.some(cartItem => cartItem.productId === product._id)
  );

  // Construct a list of items in string format for the receipt
  const itemsList = orderItems
    .map(
      item =>
        `${item.productName.padEnd(20, " ")} : \u20AA${item.price.toFixed(2)}`
    )
    .join("\n");

  // Function to generate and download the receipt
  const downloadReceipt = (orderDetails: Order) => {
    // Format the current date for the receipt
    const orderDate = moment().format("DD/MM/YYYY, HH:mm:ss");
    // Format the provided delivery date for the receipt
    const deliveryDate = moment(orderDetails.deliveryDate).format("DD/MM/YYYY");

    // Construct the receipt text
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

    // Convert the receipt text to a blob for download
    const blob = new Blob([receiptText], { type: "text/plain" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
