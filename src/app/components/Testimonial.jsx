// components/Testimonial.tsx
'use client';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    quote:
      'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which',
    name: 'Nina Margaret',
    role: 'CEO, apple',
  },
  {
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    quote:
      'The service and food here is absolutely amazing. Highly recommend this spot to anyone craving top-notch comfort eats.',
    name: 'James Carter',
    role: 'Manager, StudioX',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    quote:
      'Delicious meals and fast delivery every time. I’m always impressed with the quality and attention to detail!',
    name: 'Sophia Lee',
    role: 'Food Blogger',
  },
];

const Testimonial = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: { perView: 1 },
    spacing: 16,
  });

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">Testimonial</h4>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">Clients review</h2>

        <div ref={sliderRef} className="keen-slider h-96">
          {testimonials.map((item, index) => (
            <div key={index} className="keen-slider__slide flex flex-col md:flex-row items-center md:items-stretch gap-8 justify-center">
              <div className="relative rounded-xl overflow-hidden shadow-md max-w-md">
                <div className="absolute -left-10 -bottom-10 w-36 h-36  rounded-br-xl z-[-1]" />
                <img className="w-full h-full object-contain"
                  src={item.image}
                  alt={item.name}
                width={500}
                  height={350}
                />
              </div>

              <div className="max-w-xl text-left">
                <Quote className="w-12 h-12 text-gray-200 mb-4" />
                <p className="text-lg text-gray-800 mb-6">{item.quote}</p>
                <div className="font-semibold text-lg text-gray-900">
                  {item.name} <span className="text-red-600 ml-2 text-sm font-normal">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
