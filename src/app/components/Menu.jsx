"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SelectionModal from "./modals/selectionModal";
import CustomizeNewItemForm from "./modals/CustomizeNewItemForm";
import { useMenu } from "../context/menuContext";

export default function MenuSection() {
  const { menuItems, loading } = useMenu();
  const [modalOpen, setModalOpen] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // When menuItems change, default to first category
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setSelectedCategory(menuItems[0].category);
    } else {
      setSelectedCategory(null);
    }
  }, [menuItems]);

  // Build categories list with icons
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  ).map((category) => {
    let icon;
    switch (category) {
      case "Burgers": icon = "🍔"; break;
      case "Pizzas": icon = "🍕"; break;
      case "Chicken": icon = "🍗"; break;
      case "Sides": icon = "🍟"; break;
      case "Drinks": icon = "🥤"; break;
      case "Coffee": icon = "☕"; break;
      default: icon = "🍽️";
    }
    return { category, icon };
  });

  const selectedItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  const openModal = (item) => {
    setCustomizeItem(item);
    setModalOpen(true);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">Menu</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900">
            Choose your combo <br />& order now!
          </h2>
        </ScrollReveal>

        {loading ? (
          <p className="text-gray-500">Loading menu items...</p>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-500">No menu items available for your location</p>
        ) : (
          <>
            {/* Category Tabs */}
            <ScrollReveal>
              <div className="flex justify-center flex-wrap gap-4 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${
                      selectedCategory === cat.category ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-sm font-semibold mt-1 uppercase">{cat.category}</span>
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Item List */}
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left">
                <AnimatePresence mode="wait">
                  {selectedItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative border-b border-dotted pb-3"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                        <div className="flex items-center gap-3">
                          <p className="text-red-600 font-bold text-lg">${item.price?.toFixed(2)}</p>
                          <button
                            aria-label="Customize"
                            onClick={() => openModal(item)}
                            className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500">{item.description}</p>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </>
        )}

        <SelectionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={customizeItem?.name || "Customize Item"}
        >
          {customizeItem && (
            <CustomizeNewItemForm
              item={customizeItem}
              onClose={() => setModalOpen(false)}
            />
          )}
        </SelectionModal>
      </div>
    </section>
  );
}
