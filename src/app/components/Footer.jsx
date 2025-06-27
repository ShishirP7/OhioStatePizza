// components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-white pt-28 pb-6 relative overflow-hidden">
      {/* Top Torn Effect */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-[url('/tore.png')] bg-repeat-x bg-bottom bg-contain z-40 pointer-events-none rotate-180">
      
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <img
            src="./footer.png"
            alt="Ohio State Pizza"
            width={160}
            height={80}
            className="mx-auto"
          />
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold text-lg mb-3">Address</h4>
            <p className="text-sm text-gray-300">
              325 E Hudson St,<br />Columbus, OH 43202
            </p>
            <p className="text-sm text-gray-300 mt-3">
              819 N Nelson Rd,<br />Columbus, OH 43219
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Book a table</h4>
            <p className="text-sm text-gray-300">food och Sliders foodtruck.</p>
            <p className="text-sm text-gray-300">Under Om oss kan ni läsa</p>
            <p className="text-red-500 text-lg font-semibold mt-2">(850) 435-4155</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Opening hours</h4>
            <p className="text-sm text-gray-300">Monday – Friday</p>
            <p className="text-sm text-gray-300">10.00 AM – 11.00 PM</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Instagram feed</h4>
            <div className="text-sm text-gray-400">Coming soon...</div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* <p className="text-xs text-center text-gray-400"> */}
          {/* © 2025 © 2019, Gloreya. All rights reserved */}
        {/* </p> */}
      </div>
    </footer>
  );
};

export default Footer;
