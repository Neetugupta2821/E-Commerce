import React from "react";
import { useCart } from "../contexts/CartContext";
import { Button, List, ListItem, Typography } from "@mui/material";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Typography variant="h6">Your Cart</Typography>
      <List>
        {cart.map((item) => (
          <ListItem
            key={item.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Typography variant="body1">{item.title}</Typography>
              <Typography variant="body2">
                ${item.price} x {item.quantity}
              </Typography>
            </div>
            <div>
              <Button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <Button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </Button>
              <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" onClick={() => clearCart()}>
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;
