"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart with unique cartId
  const addToCart = (item) => {
    const cartItemWithId = { ...item, cartId: crypto.randomUUID() };
    setCartItems((prev) => [...prev, cartItemWithId]);
  };

  // Update cart item by cartId
  const updateCartItem = (cartId, updatedItem) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? updatedItem : item))
    );
  };

  // Remove item from cart
  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
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
