"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function CustomizeNewItemForm({ item, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price);

  // ✅ Only include option keys that have a `values` array with items
  const optionKeys = Object.keys(item.options || {}).filter(
    (key) =>
      item.options[key]?.values &&
      Array.isArray(item.options[key].values) &&
      item.options[key].values.length > 0
  );

  const [activeTab, setActiveTab] = useState(optionKeys[0] || "");
  console.log(item)
  const toggleOption = (optionType, label) => {
    const isMultiple = item.options[optionType]?.isMultiple;
    setSelectedOptions((prev) => {
      const current = prev[optionType] || [];
      if (isMultiple) {
        // Toggle item in multi-select
        return {
          ...prev,
          [optionType]: current.includes(label)
            ? current.filter((l) => l !== label)
            : [...current, label]
        };
      } else {
        // Single select
        return {
          ...prev,
          [optionType]: label
        };
      }
    });
  };

  // ✅ Total price calculation
  useEffect(() => {
    let total = item.price;
    for (const [key, selection] of Object.entries(selectedOptions)) {
      const optionGroup = item.options[key];
      const values = optionGroup?.values || [];

      if (Array.isArray(selection)) {
        selection.forEach((label) => {
          const match = values.find((v) => v.label === label);
          if (match) total += match.priceModifier;
        });
      } else {
        const match = values.find((v) => v.label === selection);
        if (match) total += match.priceModifier;
      }
    }
    setTotalPrice((total * quantity).toFixed(2));
  }, [selectedOptions, quantity, item]);

  const handleSubmit = () => {
    const customizedItem = {
      ...item,
      quantity,
      selectedOptions,
      totalPrice
    };
    addToCart(customizedItem);
    onClose();
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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

      {/* 🟢 Option Tabs */}
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

          {/* 🟢 Options list for active tab */}
          <div>
            {item.options[activeTab]?.values?.map((opt) => {
              const isMultiple = item.options[activeTab]?.isMultiple;
              const selected = selectedOptions[activeTab];
              const isSelected = isMultiple
                ? selected?.includes(opt.label)
                : selected === opt.label;

              return (
                <button
                  key={opt.label}
                  className={`px-2 py-1 border rounded mr-2 mb-2 ${
                    isSelected ? "bg-red-600 text-white" : "bg-gray-100"
                  }`}
                  onClick={() => toggleOption(activeTab, opt.label)}
                >
                  {opt.label}{" "}
                  {opt.priceModifier ? `(+$${opt.priceModifier})` : ""}
                </button>
              );
            })}
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
