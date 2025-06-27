"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ScrollFade from "./components/ScrollFade";
import Car from "./components/Carousel";
import Specials from "./components/Specials";
import TodaysSpecial from "./components/TodaysSpecial";
import MenuSection from "./components/Menu";
import DeliveryReward from "./components/Reward";
import Testimonial from "./components/Testimonial";
import BurgerGallery from "./components/Gallery";
import CartDrawer from "./components/CartDraw";
import Footer from "./components/Footer";

export default function Home() {
  const menuRef = useRef(null);
  const [userLocation, setUserLocation] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load on mount
  useEffect(() => {
    const savedZip = localStorage.getItem("userLocationZip") || "";
    const savedEmail = localStorage.getItem("customerEmail") || "";

    if (savedZip) {
      setUserLocation(savedZip);
    }

    if (savedEmail) {
      setCustomerEmail(savedEmail);
    }

    // If no zip, force modal
    if (!savedZip) {
      setShowSettings(true);
    }

    setIsLoading(false);
  }, []);

  // Save handler
  const handleSaveSettings = (zip, email) => {
    if (zip) {
      localStorage.setItem("userLocationZip", zip);
      setUserLocation(zip);
    }
    if (email) {
      localStorage.setItem("customerEmail", email);
      setCustomerEmail(email);
    }
    setShowSettings(false);
  };

  // Loading spinner while checking
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Settings Modal */}
      <SettingsModal
        open={showSettings}
        onClose={() => {}}
        onSave={handleSaveSettings}
        initialZip={userLocation}
        initialEmail={customerEmail}
      />

      <ScrollFade>
        <Car onOrderNowClick={() => {
          if (menuRef.current) {
            menuRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }} />
      </ScrollFade>
      <Specials />
      {/* <TodaysSpecial /> */}
      <div ref={menuRef}>
        <MenuSection />
      </div>
      <DeliveryReward />
      <Testimonial />
      <BurgerGallery />
      <CartDrawer />
      <Footer />
    </div>
  );
}

function SettingsModal({ open, onClose, onSave, initialZip, initialEmail }) {
  const [zipCode, setZipCode] = useState(initialZip || "");
  const [email, setEmail] = useState(initialEmail || "");

  useEffect(() => {
    setZipCode(initialZip || "");
    setEmail(initialEmail || "");
  }, [initialZip, initialEmail]);

  const handleSave = () => {
    if (!zipCode) return;
    onSave(zipCode, email);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => {}} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto text-black">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
              <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
                Enter Your Preferences
              </Dialog.Title>

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Preferred Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Preferred Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
