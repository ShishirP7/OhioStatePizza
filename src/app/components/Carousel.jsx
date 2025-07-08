"use client";
import React from "react";
import ScrollFade from "./ScrollFade";

const slides = [
  {
    title: "Tender Strip Treat",
    subtitle: "New in Menu",
    details: "(6 Pcs)",
    price: "$12.99",
    priceColor: "text-white",
    blendColor: "bg-[#fd7e14]",
    image: "chick1.webp",
  },
  {
    title: "TWO X-Large Pizzas",
    subtitle: "Pizza Special",
    details: "(one toping",
    price: "$23.99",
    priceColor: "text-red-700",
    blendColor: "bg-[#ffc107]",
    image: "chick2.webp",
  },
  {
    title: "Stacked With Wings",
    subtitle: "Winglicious",
    details: "(10 Pcs)",
    price: "$11.99",
    priceColor: "text-yellow-300",
    blendColor: "bg-[#dc3545]",
    image: "chick3.webp",
  },
];

const Hero = ({ onOrderNowClick }) => {
  return (
    <div className="relative w-full h-screen">
      {/* Centered Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <img
          src="/logo1.png"
          alt="Ohio State Pizza Logo"
          className="h-32 w-auto object-contain"
        />
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 h-full">
        {slides.map((slide, idx) => {
          // Only show pizza promo on mobile (but all on md+)
          const isVisibleClass = slide.title.includes("Pizzas")
            ? "flex"
            : "hidden md:flex";

          return (
            <div
              key={idx}
              className={`relative ${slide.blendColor} text-white h-full overflow-hidden flex-col ${isVisibleClass}`}
            >
              {/* Blended Background */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 bg-cover object-bottom bg-no-repeat opacity-50"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div
                  className={`absolute inset-0 ${slide.blendColor} opacity-15 mix-blend-multiply`}
                />
              </div>

              {/* Text Content */}
              <div className="relative z-30 flex-1 flex flex-col justify-center text-left p-6 md:p-20">
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl  mb-3 drop-shadow-xl text-white">
                    {slide.subtitle}
                  </h3>
                  <h1 className="text-5xl md:text-6xl mb-2 drop-shadow-xl text-white font-sans font-extrabold">
                    {slide.title}
                  </h1>
                  <p className="text-lg font-semibold mb-1 drop-shadow text-white">
                    {slide.details}
                  </p>
                  <p
                    className={`text-4xl md:text-5xl font-bold drop-shadow-xl ${slide.priceColor}`}
                  >
                    {slide.price}
                  </p>
                  {slide.title.includes("Pizzas") && (
                    <button
                      onClick={onOrderNowClick}
                      className="mt-4 font-bold underline underline-offset-4 text-orange-600 bg-white px-4 py-2 rounded shadow-lg hover:bg-amber-300 transition-colors duration-100 hover:cursor-pointer"
                    >
                      Order Now
                    </button>

                   
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Torn Edge Effect */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[url('/tore.png')] bg-repeat-x bg-bottom bg-contain z-40 pointer-events-none" />
    </div>
  );
};

export default Hero;
