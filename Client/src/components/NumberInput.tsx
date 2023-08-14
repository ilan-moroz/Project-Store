import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

const NumberInput = () => {
  const [value, setValue] = React.useState(1);

  const handleIncrease = () => {
    if (value < 99) setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 1) setValue(value - 1);
  };

  return (
    <div
      className="numberInput"
      style={{
        marginTop: "1rem",
        marginBottom: "-1.5rem",
      }}
    >
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
        value={value}
        inputProps={{ min: 1, max: 99 }}
        sx={{
          "& input": {
            height: "0.2rem",
            width: "1rem",
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