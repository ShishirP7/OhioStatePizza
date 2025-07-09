"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function CustomizeComboForm({ item, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(item.price || 0);

  useEffect(() => {
    const initialOptions = {};
    item.items.forEach((ci, idx) => {
      initialOptions[idx] = [];
    });
    setSelectedOptions(initialOptions);
  }, [item]);

  useEffect(() => {
    let total = item.price || 0;
    item.items.forEach((ci, idx) => {
      const selected = selectedOptions[idx] || [];
      selected.forEach((label) => {
        const topData = ci.toppings?.find((t) => t.name === label);
        if (topData?.extraPrice) total += topData.extraPrice;
      });
    });
    setTotalPrice((total * quantity).toFixed(2));
  }, [selectedOptions, quantity, item]);

  const handleToppingToggle = (comboIndex, toppingName, extraPrice) => {
    setSelectedOptions((prev) => {
      const current = prev[comboIndex] || [];

      // Only one free item allowed
      if (extraPrice === 0) {
        return {
          ...prev,
          [comboIndex]: [toppingName],
        };
      }

      // Allow multiple paid toppings
      const alreadySelected = current.includes(toppingName);
      return {
        ...prev,
        [comboIndex]: alreadySelected
          ? current.filter((t) => t !== toppingName)
          : [...current, toppingName],
      };
    });
  };

  const handleAddToCart = () => {
    const updatedItems = item.items.map((ci, idx) => {
      const selected = selectedOptions[idx] || [];
      const selectedToppings =
        ci.toppings?.filter((t) => selected.includes(t.name)) || [];

      return {
        ...ci,
        selectedOptions: {
          toppings: selectedToppings.map((t) => t.name),
        },
        options: {
          toppings: {
            isMultiple: true,
            values: ci.toppings || [],
          },
        },
      };
    });

    const comboItem = {
      ...item,
      quantity,
      totalPrice,
      isCombo: true,
      selectedOptions,
      items: updatedItems,
    };

    addToCart(comboItem);
    onClose();
  };

  return (
    <div className="space-y-4 text-gray-800 max-h-[75vh] overflow-y-auto pr-1">
      <div className="text-center">
        <h2 className="text-xl font-bold">{item.name}</h2>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
      </div>

      {item.items.map((ci, idx) => (
        <div key={idx}>
          <h4 className="font-semibold mb-2">
            {ci.item?.name || `Item ${idx + 1}`}
          </h4>
          <div className="flex flex-wrap gap-2">
            {ci.toppings?.length > 0 ? (
              ci.toppings.map((top) => {
                const selected = selectedOptions[idx]?.includes(top.name);
                return (
                  <button
                    key={top.name}
                    onClick={() =>
                      handleToppingToggle(idx, top.name, top.extraPrice)
                    }
                    className={`px-2 py-1 border rounded text-sm transition-all ${
                      selected ? "bg-red-600 text-white" : "bg-gray-100"
                    }`}
                  >
                    {top.name}
                    {top.extraPrice > 0 && (
                      <span> (+${top.extraPrice.toFixed(2)})</span>
                    )}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 italic">No toppings</p>
            )}
          </div>
        </div>
      ))}

      <div className="pt-4">
        <h1 className="font-semibold">Quantity</h1>

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

      <div className="text-right font-bold text-lg pt-2">
        Total: ${totalPrice}
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
