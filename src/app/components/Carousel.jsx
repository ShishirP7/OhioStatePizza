// components/Hero.tsx
'use client';
import React from 'react';
import Image from 'next/image';

const slides = [
  {
    title: 'Tender Strip Treat',
    subtitle: 'New in Menu',
    details: '(6 Pcs)',
    price: '$12.99',
    priceColor: 'text-white',
    bgColor: 'bg-orange-500',
  image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=900&q=80',
  },
  {
    title: 'TWO XL Pizzas + 1 Small FREE',
    subtitle: '🎉 Grand Opening Special 🎉',
    details: 'All for',
    price: '$23.99',
     priceColor: 'text-red-700',
    bgColor: 'bg-yellow-400',
     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    centerLogo: 'https://ohiostatepizzas.com/wp-content/uploads/2025/05/Ohio-state-pizza-logo.webp'
  },
  {
    title: 'Stacked With Wings',
    subtitle: 'Winglicious',
    details: '(10 Pcs)',
    price: '$11.99',
     priceColor: 'text-yellow-300',
    bgColor: 'bg-red-600',
    image: 'https://plus.unsplash.com/premium_photo-1683657860968-7474e7ea2d80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];



const Hero = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 h-screen">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`relative ${slide.bgColor} text-white h-full overflow-hidden flex flex-col`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70 "
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>

          {slide.centerLogo && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <img
                src={slide.centerLogo}
                alt="Center Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          )}

          <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6">
            <div>
              <h3 className="text-white text-2xl font-bold font-[cursive] mb-3">{slide.subtitle}</h3>
              <h1 className="text-5xl font-extrabold leading-tight mb-2 whitespace-pre-line">{slide.title}</h1>
              <p className="text-lg font-semibold mb-1">{slide.details}</p>
              <p className={`text-5xl font-bold ${slide.priceColor}`}>{slide.price}</p>
              {slide.title.includes('Pizzas') && (
                <button className="mt-4 font-bold underline text-black text-lg">Order Now</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Hero;
