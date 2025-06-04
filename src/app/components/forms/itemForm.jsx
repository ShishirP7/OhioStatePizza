"use client";
import React, { useState, useEffect } from "react";

export default function CustomizeItemForm({ item, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    item.options?.sizes?.[0]?.label || ""
  );
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalPrice, setTotalPrice] = useState(item.price);

  const toggleAddOn = (label) => {
    setSelectedAddOns((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  // Calculate total price whenever options change
  useEffect(() => {
    let total = item.price;

    // Add size modifier
    if (selectedSize) {
      const sizeOpt = item.options?.sizes?.find((o) => o.label === selectedSize);
      if (sizeOpt) total += sizeOpt.priceModifier;
    }

    // Add-ons
    selectedAddOns.forEach((label) => {
      const addOnOpt = item.options?.addOns?.find((o) => o.label === label);
      if (addOnOpt) total += addOnOpt.priceModifier;
    });

    total = total * quantity;

    setTotalPrice(total.toFixed(2));
  }, [item, quantity, selectedSize, selectedAddOns]);

  const handleAddToCart = () => {
    const customizedItem = {
      ...item,
      quantity,
      selectedSize,
      selectedAddOns,
      totalPrice,
    };
    // Save to localStorage or global cart
    console.log("Added to cart:", customizedItem);
    onClose();
  };

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

      {/* Sizes */}
      {item.options?.sizes && (
        <div>
          <h3 className="font-semibold">Sizes</h3>
          <div className="flex gap-2 flex-wrap">
            {item.options.sizes.map((opt) => (
              <button
                key={opt.label}
                className={`px-2 py-1 border rounded ${
                  selectedSize === opt.label
                    ? "bg-red-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedSize(opt.label)}
              >
                {opt.label} (+${opt.priceModifier})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {item.options?.addOns && (
        <div>
          <h3 className="font-semibold">Add-ons</h3>
          <div className="flex gap-2 flex-wrap">
            {item.options.addOns.map((opt) => (
              <button
                key={opt.label}
                className={`px-2 py-1 border rounded ${
                  selectedAddOns.includes(opt.label)
                    ? "bg-red-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleAddOn(opt.label)}
              >
                {opt.label} (+${opt.priceModifier})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Final total price */}
      <div className="text-right font-bold text-lg">
        Total: ${totalPrice}
      </div>

      {/* Final Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
