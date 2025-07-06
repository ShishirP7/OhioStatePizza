// components/DeliveryReward.tsx
import React from "react";
import { ShoppingCart, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const DeliveryReward = () => {
  return (
    <section className="w-full bg-[#fef4e8] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
        {/* Delivery Section */}

        <ScrollReveal>
          <div className="flex flex-col justify-between text-left">
            <div>
              <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
                Delivery & Pickup
              </h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Get it your way — hot and fresh.
              </h2>
              <p className="text-gray-600 text-base mb-6">
                <i>We’re open late every night!</i><br></br>
                <b>Mon–Thu & Sun: Open till 2:30 AM<br></br>
                Fri & Sat: Open till 3:15 AM</b>
              </p>
            </div>
            <div>
              <button className="flex items-center gap-2 bg-red-500 hover:bg-yellow-400  text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300">
                <ShoppingCart className="w-4 h-4" /> ORDER ONLINE
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* Reward Section */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <h4 className="text-red-600 font-bold text-xl mb-2 uppercase font-[cursive]">
                Made with Real Love
              </h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Quality You Can Taste in Every Bite
              </h2>
              <p className="text-gray-600 text-base mb-6">
                Our dough is handmade, our ingredients are fresh, and every pizza is crafted with care. Whether it's a quick lunch or a late-night feast — you're always getting the good stuff.
              </p>
            </div>
            <div>
              <button className="flex items-center gap-2 bg-red-600   hover:bg-yellow-400 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300">
                <Mail className="w-4 h-4" /> LEARN MORE
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DeliveryReward;
