import saveAs from "file-saver";
import { Order } from "../models/Order";

export const useReceipt = () => {
  const downloadReceipt = (orderDetails: Order) => {
    const receiptText = `
        Receipt
        -------
        Date: ${new Date().toLocaleString()}
        Delivery Date:${orderDetails.deliveryDate}

        Total Amount: \u20AA ${orderDetails.finalPrice}
        
      
        Thank you for shopping with us!
        `;

    const blob = new Blob([receiptText], { type: "text/plain" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
