"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function EditCartItemForm({ item, onClose }) {
  const { updateCartItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [selectedOptions, setSelectedOptions] = useState(item.selectedOptions || {});
  const [totalPrice, setTotalPrice] = useState(item.price);
  const isCombo = item?.isCombo;

  const optionKeys = isCombo
    ? item.items.map((_, index) => `item-${index}`)
    : Object.keys(item.options || {}).filter(
        (key) =>
          item.options[key]?.values &&
          Array.isArray(item.options[key].values) &&
          item.options[key].values.length > 0
      );

  const [activeTab, setActiveTab] = useState(optionKeys[0] || "");

  const toggleOption = (optionType, label, comboIndex = null) => {
    if (isCombo && comboIndex !== null) {
      setSelectedOptions((prev) => {
        const prevToppings = prev[comboIndex] || [];
        const newToppings = prevToppings.includes(label)
          ? prevToppings.filter((l) => l !== label)
          : [...prevToppings, label];

        return { ...prev, [comboIndex]: newToppings };
      });
    } else {
      const isMultiple = item?.options[optionType]?.isMultiple;
      setSelectedOptions((prev) => {
        const current = prev[optionType] || [];
        return {
          ...prev,
          [optionType]: isMultiple
            ? current.includes(label)
              ? current.filter((l) => l !== label)
              : [...current, label]
            : label,
        };
      });
    }
  };

  useEffect(() => {
    let total = item.price || 0;

    if (isCombo) {
      item.items.forEach((subItem, index) => {
        const toppings = selectedOptions[index] || [];
        toppings.forEach((label) => {
          const toppingData = subItem.toppings?.find((t) => t.name === label);
          if (toppingData) total += toppingData.extraPrice || 0;
        });
      });
    } else {
      for (const [key, selection] of Object.entries(selectedOptions)) {
        const values = item.options[key]?.values || [];

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
    }

    setTotalPrice((total * quantity).toFixed(2));
  }, [selectedOptions, quantity, item]);

  const handleSubmit = () => {
    const updatedItem = {
      ...item,
      quantity,
      selectedOptions,
      totalPrice,
    };
    updateCartItem(item.cartId, updatedItem);
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

      {optionKeys.length > 0 && (
        <div>
          <div className="flex border-b border-gray-200 mb-2">
            {optionKeys.map((key, idx) => (
              <button
                key={key}
                className={`px-4 py-2 ${
                  activeTab === key
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(key)}
              >
                {isCombo
                  ? item.items[idx]?.item?.name || `Item ${idx + 1}`
                  : capitalize(key)}
              </button>
            ))}
          </div>

          <div>
            {isCombo ? (
              (() => {
                const index = Number(activeTab.split("-")[1]);
                const toppings = item.items[index]?.toppings || [];
                const selected = selectedOptions[index] || [];

                return toppings.map((t) => {
                  const isSelected = selected.includes(t.name);
                  return (
                    <button
                      key={t.name}
                      className={`px-2 py-1 border rounded mr-2 mb-2 ${
                        isSelected ? "bg-red-600 text-white" : "bg-gray-100"
                      }`}
                      onClick={() => toggleOption(activeTab, t.name, index)}
                    >
                      {t.name} {t.extraPrice > 0 ? `(+${t.extraPrice})` : ""}
                    </button>
                  );
                });
              })()
            ) : (
              item.options[activeTab]?.values?.map((opt) => {
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
                    {opt.label} {opt.priceModifier ? `(+$${opt.priceModifier})` : ""}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      <div className="text-right font-bold text-lg">Total: ${totalPrice}</div>

      <button
        onClick={handleSubmit}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Update Cart
      </button>
    </div>
  );
}
