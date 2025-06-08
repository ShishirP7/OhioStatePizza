"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function CustomizeItemForm({ item, onClose }) {
  const { addToCart, updateCartItem, cartItems } = useCart();

  const isEditing = cartItems.some((c) => c.id === item.id);

  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  const optionKeys = Object.keys(item.options || {});
  const [activeTab, setActiveTab] = useState(optionKeys[0] || "");

  const toggleOption = (optionType, label) => {
    setSelectedOptions((prev) => {
      const current = prev[optionType] || [];
      if (Array.isArray(current)) {
        return {
          ...prev,
          [optionType]: current.includes(label)
            ? current.filter((o) => o !== label)
            : [...current, label],
        };
      } else {
        return { ...prev, [optionType]: label };
      }
    });
  };

  // Initialize defaults or existing selections
  useEffect(() => {
    const defaults = { ...item.selectedOptions } || {};
    if (!defaults.sizes && item.options?.sizes?.length) {
      defaults.sizes = item.options.sizes[0].label;
    }
    if (!defaults.crusts && item.options?.crusts?.length) {
      defaults.crusts = item.options.crusts[0].label;
    }
    if (!defaults.flavors && item.options?.flavors?.length) {
      defaults.flavors = item.options.flavors[0].label;
    }
    setSelectedOptions(defaults);
    setQuantity(item.quantity || 1);
  }, [item]);

  // Calculate total price
  useEffect(() => {
    let total = item.price;
    for (const [optionType, value] of Object.entries(selectedOptions)) {
      if (Array.isArray(value)) {
        value.forEach((label) => {
          const opt = item.options?.[optionType]?.find((o) => o.label === label);
          if (opt) total += opt.priceModifier;
        });
      } else {
        const opt = item.options?.[optionType]?.find((o) => o.label === value);
        if (opt) total += opt.priceModifier;
      }
    }
    total *= quantity;
    setTotalPrice(total.toFixed(2));
  }, [item, quantity, selectedOptions]);

  const handleSubmit = () => {
    const customizedItem = {
      ...item,
      quantity,
      selectedOptions,
      totalPrice,
    };

    if (isEditing) {
      updateCartItem(customizedItem);
    } else {
      addToCart(customizedItem);
    }
    onClose();
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="space-y-4 text-gray-800">
      {/* Quantity */}
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

      {/* Tabs */}
      {optionKeys.length > 0 && (
        <div>
          <div className="flex border-b border-gray-200 mb-2">
            {optionKeys.map((key) => (
              <button
                key={key}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  activeTab === key
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-600 hover:text-red-600"
                }`}
                onClick={() => setActiveTab(key)}
              >
                {capitalize(key)}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div>
            {item.options[activeTab]?.map((opt) => {
              const currentSelection = selectedOptions[activeTab];
              const isSelected = Array.isArray(currentSelection)
                ? currentSelection.includes(opt.label)
                : currentSelection === opt.label;
              return (
                <button
                  key={opt.label}
                  className={`px-2 py-1 border rounded mr-2 mb-2 ${
                    isSelected ? "bg-red-600 text-white" : "bg-gray-100"
                  }`}
                  onClick={() => toggleOption(activeTab, opt.label)}
                >
                  {opt.label} {opt.priceModifier ? `(+$${opt.priceModifier})` : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Total */}
      <div className="text-right font-bold text-lg">Total: ${totalPrice}</div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        {isEditing ? "Update Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
