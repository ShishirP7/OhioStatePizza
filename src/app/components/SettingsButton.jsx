"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { FiSettings, FiShoppingBag } from "react-icons/fi"; // Added shopping bag icon
import { PiCookingPotFill } from "react-icons/pi";

export default function SettingsButton() {
  const [open, setOpen] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [hasEmail, setHasEmail] = useState(false);

  // Load stored values on mount
  useEffect(() => {
    const savedZip = localStorage.getItem("userLocationZip") || "";
    const savedEmail = localStorage.getItem("customerEmail") || "";
    setZipCode(savedZip);
    setEmail(savedEmail);
    setHasEmail(!!savedEmail);
  }, []);

  const handleSave = () => {
    localStorage.setItem("userLocationZip", zipCode);
    localStorage.setItem("customerEmail", email);
    setHasEmail(!!email);
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 shadow"
        >
          <FiSettings className="text-lg" />
            <p className=" hidden lg:flex">Settings</p>
          
        </button>

        {hasEmail && (
          <Link
            href="/orders"
            className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 shadow"
          >
            <PiCookingPotFill className="text-lg" />
            <p className=" hidden lg:flex">Orders</p>
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
            <div
              className="fixed inset-0 backdrop-blur-sm"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-black">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
                  Update Preferences
                </Dialog.Title>

                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Preferred Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="email"
                    placeholder="Preferred Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

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
