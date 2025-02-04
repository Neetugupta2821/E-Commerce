import React from "react";
import { useCart } from "../contexts/CartContext";
import { Button, Typography } from "@mui/material";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    alert("Thank you for your purchase!");
  };

  return (
    <div>
      <Typography variant="h6">Checkout</Typography>
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <Typography variant="body1">{item.title}</Typography>
            <Typography variant="body2">
              ${item.price} x {item.quantity}
            </Typography>
          </div>
        ))}
      </div>
      <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Checkout;
