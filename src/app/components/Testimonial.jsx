"use client";
import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "This place is awesome great customer service very personable. Food was all fresh, hot and well seasoned 😍",
    name: "Mala Shiori",
  },
  {
    quote:
      "Delicious pizza AND GOOD WINGS. And very nice staff.10/10 must try again.",
    name: "Bilal Mofleh",
  },
  {
    quote:
      "I’ve been eating here for the past 3 days and have no complaints! Pizza is very good as well as the mini corn dogs, they always get me right when I ask for extra sauce on my pizza!",
    name: "Tobias Lehman",
  },
  {
    quote:
      "Most amazing pizza shop I've ever gotten pizza from. This pizza shop has been a favorite of mine 2012. I live all the way in lancaster & definitely will be making my way back to Columbus for that amazing pizza & amazing service.",
    name: "Kel Kel",
  },
];

const Testimonial = () => {
  const [mounted, setMounted] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 16 },
      },
    },
    renderMode: "performance", // ensures smoother transitions
  });

  const timer = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!slider) return;

    timer.current = setInterval(() => {
      slider.current?.next();
    }, 4000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slider]);

  if (!mounted) return null;

  return (
    <section className="w-full py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <ScrollReveal>

          <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
            Reviews
          </h4>
         

        
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">

            Slice of Feedback
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => slider.current?.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => slider.current?.next()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <ScrollReveal>
            <div ref={sliderRef} className="keen-slider h-auto py-6 px-2">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="keen-slider__slide bg-white p-8 rounded-xl shadow-lg hover:shadow-xl"
                >
                  <div className="text-left max-w-md mx-auto">
                    <Quote className="w-10 h-10 text-gray-300 mb-4" />
                    <p className="text-lg text-gray-800 mb-6 italic">"{item.quote}"</p>
                    <div className="font-semibold text-gray-900">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
