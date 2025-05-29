import React from 'react';
import { ShoppingCart } from 'lucide-react'; // Or use any emoji/icon if you prefer

const categories = [
  { icon: '🍔', label: 'Burgers' },
  { icon: '🍕', label: 'Pizzas' },
  { icon: '🍗', label: 'Chicken' },
  { icon: '🥤', label: 'Beverages' },
  { icon: '☕', label: 'Coffee' },
];

const menuItems = [
  { name: 'Smoked Brisket Sandwich', price: '$39' },
  { name: 'Pulled Chicken Sandwich', price: '$12' },
  { name: 'Ocean Spray Cranberry Juice', price: '$39' },
  { name: 'Canada Dry Ginger Ale', price: '$39' },
  { name: '6 Piece Mozzarella Sticks', price: '$10' },
  { name: "Martinelli's Apple Juice", price: '$11' },
  { name: 'Peanutty Blast Smoothie', price: '$11' },
  { name: 'Mango Mania Smoothie', price: '$12' },
];

const MenuSection = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">Menu</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900">
          Choose your combo <br />& order now!
        </h2>

        {/* Category Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center hover:cursor-pointer transition-transform transform hover:scale-110">
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold mt-1 uppercase text-red-600">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative border-b border-dotted pb-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <div className="flex items-center gap-3">
                  <p className="text-red-600 font-bold text-lg">{item.price}</p>
                  <button
                    aria-label="Add to cart"
                    className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 hover:cursor-pointer transition"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served with your choice of side
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
