"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Menu } from "lucide-react";

const BurgerHero = () => {
  const [index, setIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const slides = [
    {
      title: "Double Mushroom Burger",
      ingredients: ["Bacon", "Cheese", "Mushroom"],
      price: "$15.99",
      image: "/double-burger.png",
      bgColor: "bg-yellow-400",
    },
    {
      title: "Flame BBQ Burger",
      ingredients: ["BBQ Sauce", "Onions", "Lettuce"],
      price: "$13.49",
      image: "/flame-burger.png",
      bgColor: "bg-orange-400",
    },
    {
      title: "Cheesy Deluxe",
      ingredients: ["Double Cheese", "Tomato", "Pickle"],
      price: "$17.99",
      image: "/cheesy-burger.png",
      bgColor: "bg-yellow-300",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section
      className={`w-full min-h-screen ${current.bgColor} relative overflow-hidden transition-all duration-700`}
    >
      {/* Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between py-4 relative z-20">
          {/* Left Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-white uppercase font-semibold text-sm">
            <div className="relative group cursor-pointer">
              <span className="text-red-600">Home</span>
              <div className="absolute left-0 h-0.5 w-full bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
            <span className="cursor-pointer">Menu</span>
            <div className="relative group cursor-pointer">
              <span>Pages</span>
              <span className="ml-1">▼</span>
            </div>
            <div className="relative group cursor-pointer">
              <span>Shop</span>
              <span className="ml-1">▼</span>
            </div>
            <span className="cursor-pointer">Contact</span>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              src="https://ohiostatepizzas.com/wp-content/uploads/2025/05/Ohio-state-pizza-logo.webp"
              alt="Logo"
              className="w-20 h-auto object-contain"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <button className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold text-sm">
              Online Order
            </button>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293A1 1 0 007 17h10a1 1 0 00.894-.553L21 13M7 13L5 6" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </div>
            <button
              className="bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full lg:hidden"
              onClick={() => setNavOpen(!navOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {navOpen && (
          <div className="flex flex-col items-center gap-4 mt-4 text-white font-semibold uppercase text-sm lg:hidden transition-all duration-300">
            <span className="text-red-600">Home</span>
            <span>Menu</span>
            <span>Pages</span>
            <span>Shop</span>
            <span>Contact</span>
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-between pt-10 pb-20 gap-10">
          {/* Left */}
          <div className="flex-1 z-10 text-white text-center md:text-left">
            <h4 className="text-red-700 font-bold text-base sm:text-lg uppercase mb-2">
              New in Menu
            </h4>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 whitespace-pre-line">
              {current.title}
            </h1>

            <div className="bg-red-600 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 w-full max-w-full sm:max-w-2xl mx-auto md:mx-0">
              <ul className="flex flex-wrap justify-center sm:justify-start gap-4 text-white font-semibold text-base">
                {current.ingredients.map((ing, i) => (
                  <li key={i} className="before:content-['•'] before:mr-1">
                    {ing}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 justify-center sm:justify-end">
                <span className="text-sm">Only</span>
                <span className="text-2xl font-extrabold">{current.price}</span>
                <button className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 flex justify-center z-10">
            <Image
              src={current.image}
              alt={current.title}
              width={400}
              height={400}
              className="object-contain max-h-[250px] sm:max-h-[350px] md:max-h-[400px] w-auto"
            />
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white font-semibold text-sm z-10">
        {slides.map((_, i) => (
          <span key={i} className={i === index ? "text-red-600" : "text-white"}>
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </span>
        ))}
        <span>/ {slides.length < 10 ? `0${slides.length}` : slides.length}</span>
      </div>
    </section>
  );
};

export default BurgerHero;
