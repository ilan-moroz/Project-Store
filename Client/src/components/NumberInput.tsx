import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

type NumberInputProps = {
  quantity: number;
  onValueChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({
  onValueChange,
  quantity,
}) => {
  const handleIncrease = () => {
    if (quantity < 99) {
      onValueChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onValueChange(quantity - 1);
    }
  };

  return (
    <div className="numberInput">
      <IconButton
        sx={{ color: "rgb(70,23,155)" }}
        aria-label="decrease product"
        onClick={handleDecrease}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        id="productQuantity"
        type="number"
        value={quantity}
        inputProps={{ min: 1, max: 99 }}
        sx={{
          "& input": {
            height: "0.2rem",
            width: "1.1rem",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
            textAlign: "center",
          },
        }}
      />
      <IconButton
        sx={{ color: "rgb(70,23,155)" }}
        aria-label="increase product"
        onClick={handleIncrease}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default NumberInput;
