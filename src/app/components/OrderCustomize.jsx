"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "../data/menuItems";

export default function OrderCustomize() {
  const router = useRouter();
  const [customizedCart, setCustomizedCart] = useState([]);

  // Static cart data
  const cartData = [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 2 },
  ];

  // Build full item data
  const cartItems = cartData.map((c) => {
    const item = menuItems.find((m) => m.id === c.id);
    return { ...item, quantity: c.quantity };
  });

  // Local state for customization per item
  const [customOptions, setCustomOptions] = useState(() =>
    cartItems.map((item) => ({
      id: item.id,
      selectedSize: item.options?.sizes?.[0]?.label || "",
      selectedAddOns: [],
      selectedCrust: item.options?.crusts?.[0]?.label || "",
      selectedMeats: [],
      selectedVeggies: [],
      selectedDips: [],
      selectedFlavors: item.options?.flavors?.[0]?.label || "",
    }))
  );

  const toggleOption = (itemId, optionType, label) => {
    setCustomOptions((prev) =>
      prev.map((c) => {
        if (c.id === itemId) {
          const current = c[optionType];
          if (Array.isArray(current)) {
            return {
              ...c,
              [optionType]: current.includes(label)
                ? current.filter((o) => o !== label)
                : [...current, label],
            };
          } else {
            return { ...c, [optionType]: label };
          }
        }
        return c;
      })
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const custom = customOptions.find((c) => c.id === item.id);
      let itemTotal = item.price;

      // Sizes
      if (custom.selectedSize) {
        const opt = item.options?.sizes?.find(
          (o) => o.label === custom.selectedSize
        );
        if (opt) itemTotal += opt.priceModifier;
      }

      // Add-ons
      custom.selectedAddOns.forEach((label) => {
        const opt = item.options?.addOns?.find((o) => o.label === label);
        if (opt) itemTotal += opt.priceModifier;
      });

      // Crusts (for pizza)
      if (item.category === "Pizzas" && custom.selectedCrust) {
        const opt = item.options?.crusts?.find(
          (o) => o.label === custom.selectedCrust
        );
        if (opt) itemTotal += opt.priceModifier;
      }

      // Meats (for pizza)
      custom.selectedMeats.forEach((label) => {
        const opt = item.options?.meats?.find((o) => o.label === label);
        if (opt) itemTotal += opt.priceModifier;
      });

      // Veggies (for pizza)
      custom.selectedVeggies.forEach((label) => {
        const opt = item.options?.veggies?.find((o) => o.label === label);
        if (opt) itemTotal += opt.priceModifier;
      });

      // Dips (for fries)
      custom.selectedDips.forEach((label) => {
        const opt = item.options?.dips?.find((o) => o.label === label);
        if (opt) itemTotal += opt.priceModifier;
      });

      // Note: Flavors have no price modifier

      total += itemTotal * item.quantity;
    });

    return total.toFixed(2);
  };

  const handleProceed = () => {
    // Save customized cart to state (can be replaced with Context or localStorage)
    const finalCart = cartItems.map((item) => ({
      ...item,
      ...customOptions.find((c) => c.id === item.id),
    }));
    setCustomizedCart(finalCart);

    // Save to localStorage to access in summary page
    localStorage.setItem("customizedCart", JSON.stringify(finalCart));

    // Navigate to summary page
    router.push("/mycart/summary");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Customize My Orders
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-6">
        {cartItems.map((item) => {
          const custom = customOptions.find((c) => c.id === item.id);

          return (
            <div key={item.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>

              {/* Sizes */}
              {item.options?.sizes && (
                <div className="mb-2">
                  <h3 className="font-semibold">Sizes</h3>
                  <div className="flex gap-2 flex-wrap">
                    {item.options.sizes.map((opt) => (
                      <button
                        key={opt.label}
                        className={`px-2 py-1 border rounded ${
                          custom.selectedSize === opt.label
                            ? "bg-red-600 text-white"
                            : "bg-gray-100"
                        }`}
                        onClick={() =>
                          toggleOption(item.id, "selectedSize", opt.label)
                        }
                      >
                        {opt.label} (+${opt.priceModifier})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {item.options?.addOns && (
                <div className="mb-2">
                  <h3 className="font-semibold">Add-ons</h3>
                  <div className="flex gap-2 flex-wrap">
                    {item.options.addOns.map((opt) => (
                      <button
                        key={opt.label}
                        className={`px-2 py-1 border rounded ${
                          custom.selectedAddOns.includes(opt.label)
                            ? "bg-red-600 text-white"
                            : "bg-gray-100"
                        }`}
                        onClick={() =>
                          toggleOption(item.id, "selectedAddOns", opt.label)
                        }
                      >
                        {opt.label} (+${opt.priceModifier})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pizza-specific */}
              {item.category === "Pizzas" && (
                <>
                  {item.options?.crusts && (
                    <div className="mb-2">
                      <h3 className="font-semibold">Crusts</h3>
                      <div className="flex gap-2 flex-wrap">
                        {item.options.crusts.map((opt) => (
                          <button
                            key={opt.label}
                            className={`px-2 py-1 border rounded ${
                              custom.selectedCrust === opt.label
                                ? "bg-red-600 text-white"
                                : "bg-gray-100"
                            }`}
                            onClick={() =>
                              toggleOption(item.id, "selectedCrust", opt.label)
                            }
                          >
                            {opt.label} (+${opt.priceModifier})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.options?.meats && (
                    <div className="mb-2">
                      <h3 className="font-semibold">Meats</h3>
                      <div className="flex gap-2 flex-wrap">
                        {item.options.meats.map((opt) => (
                          <button
                            key={opt.label}
                            className={`px-2 py-1 border rounded ${
                              custom.selectedMeats.includes(opt.label)
                                ? "bg-red-600 text-white"
                                : "bg-gray-100"
                            }`}
                            onClick={() =>
                              toggleOption(item.id, "selectedMeats", opt.label)
                            }
                          >
                            {opt.label} (+${opt.priceModifier})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.options?.veggies && (
                    <div className="mb-2">
                      <h3 className="font-semibold">Veggies</h3>
                      <div className="flex gap-2 flex-wrap">
                        {item.options.veggies.map((opt) => (
                          <button
                            key={opt.label}
                            className={`px-2 py-1 border rounded ${
                              custom.selectedVeggies.includes(opt.label)
                                ? "bg-red-600 text-white"
                                : "bg-gray-100"
                            }`}
                            onClick={() =>
                              toggleOption(
                                item.id,
                                "selectedVeggies",
                                opt.label
                              )
                            }
                          >
                            {opt.label} (+${opt.priceModifier})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Fries dips */}
              {item.category === "Sides" && item.options?.dips && (
                <div className="mb-2">
                  <h3 className="font-semibold">Dips</h3>
                  <div className="flex gap-2 flex-wrap">
                    {item.options.dips.map((opt) => (
                      <button
                        key={opt.label}
                        className={`px-2 py-1 border rounded ${
                          custom.selectedDips.includes(opt.label)
                            ? "bg-red-600 text-white"
                            : "bg-gray-100"
                        }`}
                        onClick={() =>
                          toggleOption(item.id, "selectedDips", opt.label)
                        }
                      >
                        {opt.label} (+${opt.priceModifier})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Drinks flavors */}
              {item.category === "Drinks" && item.options?.flavors && (
                <div className="mb-2">
                  <h3 className="font-semibold">Flavors</h3>
                  <div className="flex gap-2 flex-wrap">
                    {item.options.flavors.map((opt) => (
                      <button
                        key={opt.label}
                        className={`px-2 py-1 border rounded ${
                          custom.selectedFlavors === opt.label
                            ? "bg-red-600 text-white"
                            : "bg-gray-100"
                        }`}
                        onClick={() =>
                          toggleOption(item.id, "selectedFlavors", opt.label)
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="text-right font-bold">Total: ${calculateTotal()}</div>

        <button
          onClick={handleProceed}
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700"
        >
          Proceed to Summary
        </button>
      </div>
    </div>
  );
}
