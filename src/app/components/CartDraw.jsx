'use client';
import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupStore, setPickupStore] = useState('325 E Hudson St');

  const toggleCart = () => setIsOpen(!isOpen);

  const storeLocations = [
    '325 E Hudson St, Columbus, OH 43202',
    '819 N Nelson Rd, Columbus, OH 43219',
  ];

  const cartItems = [
    {
      title: 'Pizza with Buffalo Chicken',
      description: '16" (8 Slices) + Regular Crust',
      price: '$27.50',
    },
    {
      title: 'Mozzarella Sticks',
      description: 'Appetizer',
      price: '$8.00',
    },
    {
      title: 'Caesar Salad',
      description: 'Small',
      price: '$8.50',
    },
  ];

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-xl z-50 hover:bg-red-700 transition-all duration-300"
        aria-label="Open Cart"
      >
        <ShoppingCart className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={toggleCart}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-lg transform transition-transform duration-300 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-xl text-gray-800">Your Cart</h2>
          <button onClick={toggleCart} aria-label="Close Cart">
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Delivery or Pickup Mode */}
        <div className="flex justify-center gap-4 px-6 py-3 border-b border-gray-100">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              mode === 'delivery'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setMode('delivery')}
          >
            Delivery
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              mode === 'pickup'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setMode('pickup')}
          >
            Pickup
          </button>
        </div>

        {/* Address Section */}
        <div className="px-6 py-4 border-b border-gray-100 space-y-3 text-sm">
          {mode === 'delivery' ? (
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Select Pickup Location
              </label>
              <div className="space-y-2">
                {storeLocations.map((store, index) => (
                  <label key={index} className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pickupStore"
                      value={store}
                      checked={pickupStore === store}
                      onChange={(e) => setPickupStore(e.target.value)}
                      className="mt-1 accent-red-600"
                    />
                    <span className="text-gray-700">{store}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {cartItems.map((item, idx) => (
            <div key={idx} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <span className="font-bold text-gray-900">{item.price}</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
              <div className="flex gap-4 mt-1 text-sm underline text-red-600">
                <button>Edit</button>
                <button>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout */}
        <div className="p-6 border-t border-gray-200">
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
