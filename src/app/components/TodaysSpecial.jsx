// components/TodaysSpecial.tsx
import React from 'react';

const items = [
  {
    image: 'https://ohiostatepizzas.com/wp-content/uploads/2025/05/Offer-1.webp',
  },
  {
    image: 'https://ohiostatepizzas.com/wp-content/uploads/2025/05/Offer-2.webp',
  },
  {
    image: 'https://ohiostatepizzas.com/wp-content/uploads/2025/05/offer-3-web.webp',
  },
  {
    image: 'https://ohiostatepizzas.com/wp-content/uploads/2025/05/offer-4-web.webp',
  },
  {
    image: 'https://ohiostatepizzas.com/wp-content/uploads/2025/05/offer-5-web.webp',
  },
];

const TodaysSpecial = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive] text-center">Today’s Specials</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 text-center">Cravings You’ll Love</h2>

        {/* First row: 2 large horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {items.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="w-full rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={`Special ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Second row: 3 smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.slice(2).map((item, index) => (
            <div
              key={index + 2}
              className="w-full rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={`Special ${index + 3}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaysSpecial;