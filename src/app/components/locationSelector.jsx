"use client";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function LocationSelector({ onLocationSelected }) {
  const [open, setOpen] = useState(true);
  const [selectedZip, setSelectedZip] = useState("");

  const handleSave = () => {
    if (selectedZip) {
      localStorage.setItem("userZipCode", selectedZip);
      setOpen(false);
      onLocationSelected(selectedZip);
    }
  };

  return (
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
              <Dialog.Title className="text-2xl font-bold mb-4">
                Select Your Zip Code
              </Dialog.Title>
              <p className="text-sm text-gray-500 mb-3">
                Choose a zip code to see available items
              </p>

              <select
                className="border px-4 py-2 rounded w-full mb-4"
                value={selectedZip}
                onChange={(e) => setSelectedZip(e.target.value)}
              >
                <option value="">Select Zip Code</option>
                <option value="43202">43202</option>
                <option value="43210">43210</option>
                <option value="10001">10001</option>
              </select>

              <button
                onClick={handleSave}
                className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
              >
                Confirm Zip Code
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
