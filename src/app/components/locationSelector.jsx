// components/LocationSelector.js
"use client";
import { useState, useEffect } from "react";

export default function LocationSelector({ onLocationSelected }) {
  const [selectedZip, setSelectedZip] = useState("");

  const handleSave = () => {
    if (selectedZip) {
      localStorage.setItem("userLocationZip", selectedZip);
      onLocationSelected(selectedZip);
    }
  };

  return (
    <div className="fixed inset-0 z-50  bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Select Your Location</h2>
        <p className="text-sm text-gray-500 mb-3">
          Choose a location to see available items
        </p>

        <select
          className="border px-4 py-2 rounded w-full mb-4"
          value={selectedZip}
          onChange={(e) => setSelectedZip(e.target.value)}
        >
          <option value="">Select Zip Code</option>
          <option value="43202">Columbus, OH 43202</option>
          <option value="43210">Columbus, OH 43210</option>
          <option value="10001">New York, NY 10001</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}
