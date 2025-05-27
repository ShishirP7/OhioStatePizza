// components/BurgerGallery.tsx
'use client';
import React from 'react';
import Image from 'next/image';

const burgers = [
  'https://images.unsplash.com/photo-1550547660-d9450f859349',
  'https://images.unsplash.com/photo-1550547660-d9450f859349',
  'https://images.unsplash.com/photo-1550547660-d9450f859349',
  'https://images.unsplash.com/photo-1550547660-d9450f859349',
  'https://images.unsplash.com/photo-1550547660-d9450f859349',

];

const BurgerGallery = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">Gallery</h4>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">Burger gallery</h2>

        <div className="grid grid-cols-5 grid-rows-2 gap-6 place-items-center">
          <div className="col-span-1 row-span-1">
            <img  src={burgers[0]} alt="Burger 1" width={280} height={220} className="rounded-xl shadow-md object-cover w-[280px] h-[220px]  transition duration-300 ease-in-out hover:scale-110" />
          </div>
          <div className="col-span-1 row-span-2 self-center">
            <img src={burgers[1]} alt="Burger 2" width={300} height={300} className="rounded-xl shadow-md object-cover w-[300px] h-[300px]  transition duration-300 ease-in-out hover:scale-110" />
          </div>
          <div className="col-span-1 row-span-1">
            <img src={burgers[2]} alt="Burger 3" width={280} height={220} className="rounded-xl shadow-md object-cover w-[280px] h-[220px]  transition duration-300 ease-in-out hover:scale-110" />
          </div>
          <div className="col-span-1 row-span-2 self-center">
            <img src={burgers[3]} alt="Burger 4" width={280} height={300} className="rounded-xl shadow-md object-cover w-[280px] h-[300px]  transition duration-300 ease-in-out hover:scale-110" />
          </div>
          <div className="col-span-1 row-span-1">
            <img src={burgers[4]} alt="Burger 5" width={280} height={220} className="rounded-xl shadow-md object-cover w-[280px] h-[220px]  transition duration-300 ease-in-out hover:scale-110" />
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default BurgerGallery;