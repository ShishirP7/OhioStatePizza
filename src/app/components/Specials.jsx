// components/Specials.tsx
import React from "react";
import { ShoppingCart } from "lucide-react";

const Specials = () => {
  return (
    <section className="w-full py-16 bg-white text-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
          Specials Combo
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
          Our delicious burgers
        </h2>

        <div className="flex justify-center gap-8">
          {[1, 1, 1].map((item, index) => (
            <div
              className="bg-green-200  hover:bg-red-600  hover:text-white px-6 pt-6 pb-16 rounded-lg shadow-lg max-w-xs transition-all duration-300 transform hover:-translate-y-3 hover:shadow-xl"
              key={index}
            >
              <div>
                <h4 className="text-lg font-bold leading-tight mb-2">
                  2 Extra Large
                  <br />
                  Pizzas (1 Topping)
                </h4>
                <p className="text-2xl font-bold transition-all hover:text-white mb-4">
                  $ 23.95
                </p>

                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="hover:bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                    <ShoppingCart className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
