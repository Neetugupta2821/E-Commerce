import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { CartProvider } from "./contexts/CartContext";
 
 

function App() {
  return (
      
    <CartProvider>
      <Header />
      <Home />
    </CartProvider>
     
  );
}

export default App;
