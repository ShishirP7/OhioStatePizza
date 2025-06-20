"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function CustomizeComboForm({ item, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price);

  useEffect(() => {
    setTotalPrice((item.price * quantity).toFixed(2));
  }, [quantity, item.price]);

  const handleAddToCart = () => {
    const comboItem = {
      ...item,
      quantity,
      selectedOptions: {}, // combos typically don’t have custom options
      totalPrice,
      isCombo: true
    };
    addToCart(comboItem);
    onClose();
  };

  return (
    <div className="space-y-6 text-gray-800">
      {/* Combo Title */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{item.name}</h2>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="font-semibold text-center">Quantity</h3>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="text-right font-bold text-lg">
        Total: ${totalPrice}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
