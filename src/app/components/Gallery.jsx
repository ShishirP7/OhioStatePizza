// components/BurgerGallery.tsx
"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NextArrow = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} z-10 text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400`}
    >
      <FaArrowRight size={24} />
    </div>
  );
};

const PrevArrow = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} z-10 text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400`}
    >
      <FaArrowLeft size={24} />
    </div>
  );
};

const burgers = [
  "/ohio-state-pizza-sticker-1.webp",
  "/ohio-state-pizza-sticker-2.webp",
  "/ohio-state-pizza-sticker-3.webp",
  "/ohio-state-pizza-sticker-4.webp",
  "/ohio-state-pizza-sticker-5.webp",
  "/ohio-state-pizza-sticker-6.webp",
  "/ohio-state-pizza-sticker-7.webp",
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  pauseOnHover: true,
  centerMode: true,
  centerPadding: "20px",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const BurgerGallery = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <ScrollReveal>
         

          <h3 className="text-orange-600 font-bold text:sm md:text-xl mb-2 uppercase tracking-widest">
            Our hottest deals, ready till 2:30 AM every night.
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
            Late Cravings? We Got You.
          </h2>

          {/* Masonry-style grid */}

          <BurgerCarousel burgers={burgers} />
          {/* <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-screen-xl">
              {burgers.map((src, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] w-full overflow-hidden rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <img
                    src={src}
                    alt={`Burger ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </ScrollReveal>
      </div>
    </section>
  );
};

function BurgerCarousel({ burgers }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Slider {...settings}>
        {burgers.map((src, index) => (
          <div key={index} className="p-2">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
              <img
                src={src}
                alt={`Burger ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BurgerGallery;
