"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

export default function CartSummary() {
  const { cartItems } = useCart();
  const router = useRouter();

  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 text-black py-8 px-4 flex justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Order Summary */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

          {/* Carryout Info */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Carryout Time
              </label>
              <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>As soon as possible</option>
                <option>Schedule for later</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Carryout Address
              </label>
              <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>44 S Central Ave, Fairborn, OH 45324</option>
                <option>819 N Nelson Rd, Columbus, OH 43219</option>
              </select>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty</p>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded p-4 flex justify-between items-start"
                >
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>

                    {/* Dynamically show all selected options */}
                    {item.selectedOptions &&
                      Object.entries(item.selectedOptions).map(([key, value]) => {
                        if (!value || (Array.isArray(value) && value.length === 0)) return null;

                        // Make key human-readable
                        const label = key.charAt(0).toUpperCase() + key.slice(1);

                        return (
                          <p key={key} className="text-sm text-gray-600">
                            {label}:{" "}
                            {Array.isArray(value) ? value.join(", ") : value}
                          </p>
                        );
                      })}
                  </div>

                  <div className="font-bold text-gray-900">${item.totalPrice}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Order Overview */}
        <div className="bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Order Overview</h2>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Estimated Tax</span>
            <span>$0.00</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-gray-900">
            <span>Order Total</span>
            <span>${total}</span>
          </div>

          <button
            onClick={() => router.push("/confirmation")}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
