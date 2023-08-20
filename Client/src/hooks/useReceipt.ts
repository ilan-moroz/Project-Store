import saveAs from "file-saver";
import { Order } from "../models/Order";

export const useReceipt = (orderDetails: Order) => {
  const downloadReceipt = () => {
    const receiptText = `
        Receipt
        -------
        Order Number: 12345
        Date: ${new Date().toLocaleString()}
        Delivery Date:${orderDetails.deliveryDate}

        Total Amount: &#8362;${orderDetails.finalPrice}
        
      
        Thank you for shopping with us!
        `;

    const blob = new Blob([receiptText], { type: "text/plain" });
    saveAs(blob, "receipt.txt");
  };

  return { downloadReceipt };
};
