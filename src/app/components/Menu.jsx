"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const menuData = [
  {
    category: "Burgers",
    icon: "🍔",
    items: [
      { name: "Classic Beef Burger", price: "$9" },
      { name: "Spicy Chicken Burger", price: "$10" },
    ],
  },
  {
    category: "Pizzas",
    icon: "🍕",
    items: [
      { name: "Pepperoni Pizza", price: "$14" },
      { name: "Veggie Supreme", price: "$13" },
    ],
  },
  {
    category: "Chicken",
    icon: "🍗",
    items: [
      { name: "6pc Wings", price: "$8" },
      { name: "Boneless Chicken", price: "$9" },
    ],
  },
  {
    category: "Beverages",
    icon: "🥤",
    items: [
      { name: "Lemonade", price: "$3" },
      { name: "Cola", price: "$2.5" },
    ],
  },
  {
    category: "Coffee",
    icon: "☕",
    items: [
      { name: "Espresso", price: "$3.5" },
      { name: "Cappuccino", price: "$4" },
    ],
  },
];

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  const selectedItems =
    menuData.find((cat) => cat.category === selectedCategory)?.items || [];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
            Menu
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900">
            Choose your combo <br />& order now!
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          {/* Category Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            {menuData.map((cat, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(cat.category)}
                className={`flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110 ${
                  selectedCategory === cat.category
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold mt-1 uppercase">
                  {cat.category}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* Menu Items */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left">
            <AnimatePresence mode="wait">
              {selectedItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative border-b border-dotted pb-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-red-600 font-bold text-lg">
                        {item.price}
                      </p>
                      <button
                        aria-label="Add to cart"
                        className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Delicious and fresh {selectedCategory.toLowerCase()} item to
                    enjoy!
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MenuSection;
