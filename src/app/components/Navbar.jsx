import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-8 text-white font-semibold uppercase text-sm">
        <div className="text-red-600">Home</div>
        <div>Menu</div>
        <div>Pages</div>
        <div>Shop</div>
        <div>Contact</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold text-sm">
          Online Order
        </button>
        <div className="w-6 h-6 bg-red-600 flex items-center justify-center rounded-full text-white text-xs">
          ☰
        </div>
      </div>
    </div>
  );
};

export default Navbar;
