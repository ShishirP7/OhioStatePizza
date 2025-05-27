// components/MenuSection.tsx
import React from 'react';

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
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900">Choose your combo <br/>&  order now!</h2>

        <div className="flex justify-center space-x-6 mb-10">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold mt-1 uppercase text-red-600">{cat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative border-b border-dotted pb-3">
              {item.badge && (
                <span className="absolute -top-2 left-0 text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <p className="text-red-600 font-bold text-lg">{item.price}</p>
              </div>
              <p className="text-sm text-gray-500">Pulled Pork, Beer Braised Brisket, & Quarter Rack of Ribs served with your choice of side</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
