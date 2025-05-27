// components/DeliveryReward.tsx
import React from 'react';
import { ShoppingCart, Mail } from 'lucide-react';

const DeliveryReward = () => {
  return (
    <section className="w-full bg-[#fef4e8] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
        {/* Delivery Section */}
        <div className="flex flex-col justify-between text-left">
          <div>
            <h4 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">Delivery</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Choose what you want, select a pick up time
            </h2>
            <p className="text-gray-600 text-base mb-6">
              As well known and we are very busy all days advice you. advice you to call us of before arriving,
              so we can guarantee your seat.
            </p>
          </div>
          <div>
            <button className="flex items-center gap-2 bg-red-500 hover:bg-yellow-400  text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300">
              <ShoppingCart className="w-4 h-4" /> ORDER ONLINE
            </button>
          </div>
        </div>

        {/* Reward Section */}
        <div className="flex flex-col justify-between text-left">
          <div>
            <h4 className="text-red-600 font-bold text-xl mb-2 uppercase font-[cursive]">Reward</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Earn points every time you order online
            </h2>
            <p className="text-gray-600 text-base mb-6">
              As well known and we are busy all days advice you. advice you to call us of before arriving,
              so we can guarantee your seat. advice
            </p>
          </div>
          <div>
            <button className="flex items-center gap-2 bg-red-600   hover:bg-yellow-400 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300">
              <Mail className="w-4 h-4" /> LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryReward;
