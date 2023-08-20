import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "./Button/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { setFinishedOrder } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useReceipt } from "../hooks/useReceipt";
import { Order } from "../models/Order";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid rgb(103, 32, 180)",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  textAlign: "center",
  color: "rgb(103, 32, 180)",
};

export default function OrderCompletedModal({
  onClose,
  isOpen,
  orderDetails,
}: {
  onClose: () => void;
  isOpen: boolean;
  orderDetails?: Order;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    dispatch(setFinishedOrder());
    navigate("/");
  };

  const { downloadReceipt } = useReceipt();

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CheckCircleIcon sx={{ fontSize: 50, color: "rgb(103, 32, 180)" }} />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "Josefin Sans", fontSize: "1.5rem", mt: 2 }}
          >
            Your order is completed!!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontFamily: "Josefin Sans" }}
          >
            Thank you for shopping with us! Your order has been placed and will
            be processed shortly.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ textDecoration: "underline", cursor: "pointer", mt: 1 }}
            onClick={() => downloadReceipt(orderDetails!)}
          >
            Download your receipt
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              type="button"
              text="Back to Homepage"
              color=" rgb(103, 32, 180)"
              onClick={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}