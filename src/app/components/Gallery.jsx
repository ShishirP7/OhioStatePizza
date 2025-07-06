// components/BurgerGallery.tsx
"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";

const burgers = [
  "/ohio-state-pizza-sticker-1.webp",
  "/ohio-state-pizza-sticker-2.webp",
  "/ohio-state-pizza-sticker-3.webp",
  "/ohio-state-pizza-sticker-4.webp",
  "/ohio-state-pizza-sticker-5.webp",
  "/ohio-state-pizza-sticker-6.webp",
  "/ohio-state-pizza-sticker-7.webp",
];

const BurgerGallery = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
            Our hottest deals, ready till 2:30 AM every night.
          </h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
            Late Cravings? We Got You.
          </h2>

          {/* Masonry-style grid */}
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {burgers.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Burger ${index + 1}`}
                className="rounded-xl shadow-md w-full mb-4 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{
                  height: index % 3 === 0 ? '300px' : index % 3 === 1 ? '400px' : '250px',
                }}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BurgerGallery;
