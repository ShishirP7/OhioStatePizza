"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import SelectionModal from "./modals/selectionModal";
import EditCartItemForm from "./EditCartItemForm"; // 🟢 Use the new edit-only form
import Link from "next/link";
import { motion } from "framer-motion";

const CartDrawer = ({ fullPage = false }) => {
  const { cartItems, updateCartItem, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  const [customizeIndex, setCustomizeIndex] = useState(null);

  const toggleCart = () => setIsOpen(!isOpen);

  const handleCustomize = (item, index) => {
    setCustomizeItem(item);
    setCustomizeIndex(index);
    setModalOpen(true);
  };

  // Bounce animation
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    if (cartItems.length > 0) {
      setBounce(true);
      const timeout = setTimeout(() => setBounce(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [cartItems.length]);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-xl z-50 hover:bg-red-700 transition-all duration-300 "
        aria-label="Open Cart"
      >
        <motion.div
          animate={bounce ? { scale: [1, 1.2, 0.9, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <ShoppingCart className="w-6 h-6" />
        </motion.div>

        {/* Red badge for item count */}
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="font-bold text-xl text-gray-800">Your Cart</h2>
            <button onClick={toggleCart} aria-label="Close Cart">
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <span className="font-bold text-gray-900">
                      ${item.totalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex gap-4 mt-1 text-sm underline text-red-600">
                    <button onClick={() => handleCustomize(item, idx)}>
                      Customize
                    </button>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="underline text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Button */}
          <div className="p-6 border-t border-gray-200 flex-shrink-0">
            {cartItems.length > 0 ? (
              <Link href="/mycart/summary">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for editing cart item */}
      <SelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={customizeItem?.name || "Customize Item"}
      >
        {customizeItem && (
          <EditCartItemForm
            item={customizeItem}
            index={customizeIndex}
            onClose={() => setModalOpen(false)}
          />
        )}
      </SelectionModal>
    </>
  );
};

export default CartDrawer;
