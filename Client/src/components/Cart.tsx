import React from "react";

const Cart = () => {
  const [total, setTotal] = React.useState(0);

  return (
    <div style={{ marginTop: "-2rem" }}>
      <h2>Your Cart</h2>
      <h3>Total: &#8362; {total.toFixed(2)}</h3>
    </div>
  );
};
export default Cart;
