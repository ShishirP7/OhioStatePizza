"use client";
import React from "react";

const slides = [
  {
    title: "Tender Strip Treat",
    subtitle: "New in Menu",
    details: "(6 Pcs)",
    price: "$12.99",
    priceColor: "text-white",
    bgColor: "bg-orange-500",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=900&q=80",
  },
  {
    title: "TWO XL Pizzas + 1 Small FREE",
    subtitle: "🎉 Grand Opening Special 🎉",
    details: "All for",
    price: "$23.99",
    priceColor: "text-red-700",
    bgColor: "bg-yellow-400",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Stacked With Wings",
    subtitle: "Winglicious",
    details: "(10 Pcs)",
    price: "$11.99",
    priceColor: "text-yellow-300",
    bgColor: "bg-red-600",
    image:
      "https://plus.unsplash.com/premium_photo-1683657860968-7474e7ea2d80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Centered Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <img
          src="https://ohiostatepizzas.com/wp-content/uploads/2025/05/Ohio-state-pizza-logo.webp"
          alt="Ohio State Pizza Logo"
          className="h-32 w-auto object-contain"
        />
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Only show the first promotion on mobile */}
        {slides.map((slide, idx) => {
          // Hide slides 1 & 2 (index 1 & 2) on mobile
          const isMobileHidden = idx !== 0 ? "hidden md:flex" : "flex";

          return (
            <div
              key={idx}
              className={`relative ${slide.bgColor} text-white h-full overflow-hidden flex-col ${isMobileHidden}`}
            >
              {/* Background Image + Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black opacity-60 z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </div>

              {/* Text Content */}
              <div className="relative z-30 flex-1 flex flex-col justify-center items-center text-center px-6">
                <h3 className="text-2xl font-[cursive] mb-3 drop-shadow-lg">
                  {slide.subtitle}
                </h3>
                <h1 className="text-5xl font-extrabold mb-2 drop-shadow-xl">
                  {slide.title}
                </h1>
                <p className="text-lg font-semibold mb-1 drop-shadow-md">
                  {slide.details}
                </p>
                <p
                  className={`text-5xl font-bold ${slide.priceColor} drop-shadow-xl`}
                >
                  {slide.price}
                </p>
                {slide.title.includes("Pizzas") && (
                  <button className="mt-4 font-bold  underline underline-offset-4 text-black bg-white px-4 py-2 rounded shadow-lg hover:bg-amber-300 transition-colors duration-100  hover:cursor-pointer">
                    Order Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
