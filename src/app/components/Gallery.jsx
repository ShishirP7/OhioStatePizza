// components/BurgerGallery.tsx
"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";

const burgers = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
];

const BurgerGallery = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
            Gallery
          </h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
            Burger gallery
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
            <img
              src={burgers[0]}
              alt="Burger 1"
              className="rounded-xl shadow-md object-cover w-full h-56 transition duration-300 ease-in-out hover:scale-110"
            />
            <img
              src={burgers[1]}
              alt="Burger 2"
              className="rounded-xl shadow-md object-cover w-full h-72 sm:row-span-2 transition duration-300 ease-in-out hover:scale-110"
            />
            <img
              src={burgers[2]}
              alt="Burger 3"
              className="rounded-xl shadow-md object-cover w-full h-56 transition duration-300 ease-in-out hover:scale-110"
            />
            <img
              src={burgers[3]}
              alt="Burger 4"
              className="rounded-xl shadow-md object-cover w-full h-72 sm:row-span-2 transition duration-300 ease-in-out hover:scale-110"
            />
            <img
              src={burgers[4]}
              alt="Burger 5"
              className="rounded-xl shadow-md object-cover w-full h-56 transition duration-300 ease-in-out hover:scale-110"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BurgerGallery;
