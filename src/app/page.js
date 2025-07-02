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
import { useMenu } from "./context/menuContext";
import SettingsButton from "./components/SettingsButton";
import axios from "axios";



export default function Home() {
  const menuRef = useRef(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { zip, fetchMenuItemsByZip } = useMenu();

  // Load on mount
  useEffect(() => {
    const savedZip = localStorage.getItem("userZipCode") || "";
    const savedEmail = localStorage.getItem("customerEmail") || "";

    if (!savedZip) {
      setShowSettings(true);
    }

    setCustomerEmail(savedEmail);
    setIsLoading(false);
  }, []);

 

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
        initialZip={zip}
        initialEmail={customerEmail}
      />
      <div className="fixed top-4 right-4 z-50">
        <SettingsButton />
      </div>

      <ScrollFade>
        <Car
          onOrderNowClick={() => {
            if (menuRef.current) {
              menuRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        />
      </ScrollFade>

      <Specials />

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

function SettingsModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [nearestStore, setNearestStore] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [serviceType, setServiceType] = useState(""); // "Carryout" or "Delivery"

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    zip: "",
  });

  const nelsonZips = ["43219", "43211", "43244"];
  const hudsonZips = ["43202", "43210", "43201", "43214", "43212"];

  const validateDeliveryZip = (zip, storeId) => {
    if (!zip) return false;
    if (nelsonZips.includes(zip) && storeId && nearestStore && storeId === nearestStore._id) return true;
    if (hudsonZips.includes(zip) && storeId && nearestStore && storeId === nearestStore._id) return true;
    return false;
  };

  const handleCheckStore = async () => {
    setError("");
    if (!zipCode.trim()) {
      setError("Please enter your ZIP code.");
      return;
    }
    setChecking(true);
    try {
      const res = await axios.get(`https://api.ohiostatepizzas.com/api/location/items-by-zip/${zipCode.trim()}`);
      if (res.data?.serviceAvailable && res.data?.nearestStore) {
        setNearestStore(res.data.nearestStore);
        setStep(2);
      } else {
        setError("Sorry, service is not available in your area.");
      }
    } catch (err) {
      console.error(err);
      setError("Error checking store. Please try again.");
    } finally {
      setChecking(false);
    }
  };

const handleConfirm = () => {
  if (!nearestStore) return;

  // Validate
  if (!serviceType) {
    setError("Please select Carryout or Delivery.");
    return;
  }

  if (serviceType === "Delivery") {
    if (!deliveryAddress.street || !deliveryAddress.zip || !deliveryAddress.city) {
      setError("Please fill in all delivery address fields.");
      return;
    }
    if (!validateDeliveryZip(deliveryAddress.zip.trim(), nearestStore._id)) {
      setError(`Delivery is not available to ZIP code ${deliveryAddress.zip} for this store.`);
      return;
    }
  }

  // Always save these fields
  localStorage.setItem("customerEmail", email);
  localStorage.setItem("userZipCode", zipCode.trim());
  localStorage.setItem("userLocation", serviceType);
  localStorage.setItem("userStoreId", nearestStore._id);
  localStorage.setItem("userStoreName", nearestStore.name);

  // Save delivery address if Delivery
  if (serviceType === "Delivery") {
    localStorage.setItem("userDeliveryAddress", JSON.stringify({
      ...deliveryAddress,
      storeId: nearestStore._id,
      storeName: nearestStore.name
    }));
  } else {
    localStorage.removeItem("userDeliveryAddress");
  }

  window.location.reload();
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
                {step === 1 ? "Enter Your ZIP & Email" : "Choose Service Type"}
              </Dialog.Title>

              {step === 1 && (
                <>
                  <div className="space-y-3 mb-4 text-left">
                    <label className="text-sm font-semibold text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />

                    <label className="text-sm font-semibold text-gray-700">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button
                    onClick={handleCheckStore}
                    disabled={checking}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    {checking ? "Checking..." : "Check Store"}
                  </button>
                </>
              )}

              {step === 2 && nearestStore && (
                <>
                  <div className="mb-4 text-left">
                    <p className="font-semibold text-gray-700 mb-1">✅ Service Available!</p>
                    <p className="text-gray-800">{nearestStore.name}</p>
                    <p className="text-gray-500 text-sm">
                      {nearestStore.address.formatted}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 mb-4">
                    <button
                      onClick={() => setServiceType("Carryout")}
                      className={`px-4 py-2 rounded ${
                        serviceType === "Carryout"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Carryout
                    </button>
                    <button
                      onClick={() => setServiceType("Delivery")}
                      className={`px-4 py-2 rounded ${
                        serviceType === "Delivery"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Delivery
                    </button>
                  </div>

                  {serviceType === "Delivery" && (
                    <div className="space-y-3 text-left mb-4">
                      <label className="text-sm font-semibold text-gray-700">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={deliveryAddress.street}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            street: e.target.value,
                          }))
                        }
                        className="w-full border px-3 py-2 rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Apartment / Unit (optional)"
                        value={deliveryAddress.apartment}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            apartment: e.target.value,
                          }))
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        className="w-full border px-3 py-2 rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={deliveryAddress.zip}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            zip: e.target.value,
                          }))
                        }
                        className="w-full border px-3 py-2 rounded"
                        required
                      />
                    </div>
                  )}

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  {serviceType && (
                    <button
                      onClick={handleConfirm}
                      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                      Confirm
                    </button>
                  )}
                </>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}


