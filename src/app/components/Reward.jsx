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
              <h3 className="text-orange-600 font-normal text-xl md:text-3xl mb-3">
                Delivery & Pickup
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
                Get it your way — hot and fresh
              </h2>

              <div className="text-gray-600 text-base mb-6">
                <div>We’re open late every night!</div>
                <div>
                  Mon–Thu & Sun: Open till 2:30 AM<br></br>
                  Fri & Sat: Open till 3:15 AM
                </div>
              </div>
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
              <h3 className="text-orange-600 font-normal text-xl md:text-3xl mb-3">
                Made with Real Love
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
                Quality You Can Taste in Every Bite
              </h2>

              <p className="text-gray-600 text-base mb-6">
                Our dough is handmade, our ingredients are fresh, and every
                pizza is crafted with care. Whether it's a quick lunch or a
                late-night feast — you're always getting the good stuff.
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
