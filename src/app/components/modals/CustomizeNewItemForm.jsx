"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function CustomizeNewItemForm({ item, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  const optionKeys = Object.keys(item.options || {});
  const [activeTab, setActiveTab] = useState(optionKeys[0] || "");

  const toggleOption = (optionType, label) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: label,
    }));
  };

  useEffect(() => {
    let total = item.price;
    for (const [key, label] of Object.entries(selectedOptions)) {
      const opt = item.options[key]?.find((o) => o.label === label);
      if (opt) total += opt.priceModifier;
    }
    setTotalPrice((total * quantity).toFixed(2));
  }, [selectedOptions, quantity, item]);

  const handleSubmit = () => {
    const customizedItem = {
      ...item,
      quantity,
      selectedOptions,
      totalPrice,
    };
    addToCart(customizedItem);
    onClose();
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="space-y-4 text-gray-800">
      <div>
        <h3 className="font-semibold">Quantity</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>

      {optionKeys.length > 0 && (
        <div>
          <div className="flex border-b border-gray-200 mb-2">
            {optionKeys.map((key) => (
              <button
                key={key}
                className={`px-4 py-2 ${
                  activeTab === key
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(key)}
              >
                {capitalize(key)}
              </button>
            ))}
          </div>

          <div>
            {item.options[activeTab]?.map((opt) => (
              <button
                key={opt.label}
                className={`px-2 py-1 border rounded mr-2 mb-2 ${
                  selectedOptions[activeTab] === opt.label
                    ? "bg-red-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleOption(activeTab, opt.label)}
              >
                {opt.label} {opt.priceModifier ? `(+$${opt.priceModifier})` : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-right font-bold text-lg">Total: ${totalPrice}</div>

      <button
        onClick={handleSubmit}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
