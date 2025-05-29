import React from "react";
import { ShoppingCart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const specialCombo = [
  {
    title: "Smoked Brisket",
    desc: "Pulled Pork, Beer Braised Brisket, & Quarter",
    price: "$40",
    image:
      "https://png.pngtree.com/png-vector/20240602/ourmid/pngtree-biggest-burger-transparent-picture-png-image_12606363.png",
  },
  {
    title: "Buffalo Ranch",
    desc: "Pulled Pork, Beer Braised Brisket, & Quarter",
    price: "$40",
    image:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-3d-illustration-cheese-burger-png-image_10245728.png",
  },
  {
    title: "BBQ Burger",
    desc: "Pulled Pork, Beer Braised Brisket, & Quarter",
    price: "$30",
    image: "https://pngimg.com/d/burger_sandwich_PNG4114.png",
  },
  {
    title: "Big Hootie",
    desc: "Pulled Pork, Beer Braised Brisket, & Quarter",
    price: "$40",
    image: "https://pngimg.com/d/burger_sandwich_PNG4114.png",
  },
];

const Specials = () => {
  return (
    <section className="w-full py-16 bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
          Specials Combo
        </h3>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
          Our delicious burgers
        </h2>
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 hover:cursor-grab">
            {specialCombo.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white shadow-2xl rounded-xl p-6 flex flex-col justify-between items-center transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Hover background image + red overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"
                  style={{
                    backgroundImage: "url('/pizzabg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "multiply",
                  }}
                />
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-90  z-0" />

                {/* Content */}
                <div className="relative z-10 text-center mb-4">
                  <h4 className="text-xl font-extrabold text-black group-hover:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-white">
                    {item.desc}
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-4 group-hover:text-white">
                    {item.price}
                  </p>
                </div>

                {/* Button */}
                <button className="relative z-10 bg-[#fff7ec] text-red-600 group-hover:bg-yellow-400 group-hover:text-black mt-4 px-6 py-2 rounded-full flex items-center gap-2 shadow-md font-semibold transition-all">
                  <ShoppingCart className="w-4 h-4" />
                  ORDER NOW
                </button>

                {/* Burger image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 mt-6 h-36  object-contain"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Specials;
