"use client";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Always add as a new line item with unique cartId
  const addToCart = (item) => {
    const cartItemWithId = { ...item, cartId: crypto.randomUUID() };
    setCartItems((prev) => [...prev, cartItemWithId]);
  };

  // Update Cart Item by cartId
  const updateCartItem = (cartId, updatedItem) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? updatedItem : item
      )
    );
  };

  // Remove item by cartId
  const removeFromCart = (cartId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartId !== cartId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItem, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
