import { useState } from "react";

export default function useCart() {
  const [mode, setMode] = useState("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupStore, setPickupStore] = useState(
    "325 E Hudson St, Columbus, OH 43202"
  );

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Pizza with Buffalo Chicken",
      description: '16" (8 Slices) + Regular Crust',
      price: "$27.50",
    },
    {
      id: 2,
      title: "Mozzarella Sticks",
      description: "Appetizer",
      price: "$8.00",
    },
    {
      id: 3,
      title: "Caesar Salad",
      description: "Small",
      price: "$8.50",
    },
  ]);

  return {
    mode,
    setMode,
    deliveryAddress,
    setDeliveryAddress,
    pickupStore,
    setPickupStore,
    cartItems,
    setCartItems,
  };
}
