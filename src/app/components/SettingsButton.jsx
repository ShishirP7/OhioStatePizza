"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { FiSettings } from "react-icons/fi";
import { MdMyLocation } from "react-icons/md";
import { PiCookingPotFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SettingsButton() {
  const [open, setOpen] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [nearestStore, setNearestStore] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [serviceType, setServiceType] = useState("");
  const router = useRouter();

  // Load stored values on mount
  useEffect(() => {
    const savedZip = localStorage.getItem("userZipCode") || "";
    const savedEmail = localStorage.getItem("customerEmail") || "";
    const savedServiceType = localStorage.getItem("userLocation") || "";
    const savedStoreId = localStorage.getItem("userStoreId") || "";
    const savedStoreName = localStorage.getItem("userStoreName") || "";

    setZipCode(savedZip);
    setEmail(savedEmail);
    setHasEmail(!!savedEmail);
    setServiceType(savedServiceType);
    if (savedStoreId && savedStoreName) {
      setNearestStore({ _id: savedStoreId, name: savedStoreName });
    }
  }, []);

  const handleCheckStore = async () => {
    setError("");
    if (!zipCode) {
      setError("Please enter a ZIP code.");
      return;
    }
    setChecking(true);
    try {
      const res = await axios.get(
        `https://api.ohiostatepizzas.com/api/location/items-by-zip/${zipCode}`
      );
      if (res.data?.serviceAvailable && res.data?.nearestStore) {
        setNearestStore(res.data.nearestStore);
        setError("");
      } else {
        setError("Service not available for this ZIP code.");
      }
    } catch (err) {
      console.error(err);
      setError("Error checking store. Try again.");
    } finally {
      setChecking(false);
    }
  };

  const handleSave = () => {
    if (!zipCode) {
      setError("ZIP code is required.");
      return;
    }
    if (!nearestStore) {
      setError("Please check and select store first.");
      return;
    }
    if (!serviceType) {
      setError("Please select Carryout or Delivery.");
      return;
    }

    localStorage.setItem("userZipCode", zipCode.trim());
    localStorage.setItem("customerEmail", email.trim());
    localStorage.setItem("userLocation", serviceType);
    localStorage.setItem("userStoreId", nearestStore._id);
    localStorage.setItem("userStoreName", nearestStore.name);

    setHasEmail(!!email);
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-2 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 shadow"
        >
          <MdMyLocation color="orange" className="text-lg" />
          <p className="hidden lg:flex text-amber-400">Address</p>
        </button>

        {hasEmail && (
          <Link
            href="/orders"
            className="flex items-center gap-2 px-2 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 shadow"
          >
            <PiCookingPotFill color="orange" className="text-lg" />
            <p className="hidden lg:flex  text-amber-400">Orders</p>
          </Link>
        )}
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => setOpen(false)} className="relative z-50">
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
                  Update Preferences
                </Dialog.Title>

                <div className="space-y-3 mb-4 text-left">
                  <label className="text-sm font-semibold text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />

                  <label className="text-sm font-semibold text-gray-700">Email (optional)</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />

                  <button
                    onClick={handleCheckStore}
                    disabled={checking}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    {checking ? "Checking..." : "Check Store"}
                  </button>
                </div>

                {nearestStore && (
                  <div className="border rounded p-3 mb-4 text-left">
                    <p className="font-semibold text-gray-700 mb-1">Nearest Store:</p>
                    <p className="text-gray-800">{nearestStore.name}</p>
                  </div>
                )}

                {nearestStore && (
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
                )}

                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
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
    </>
  );
}
