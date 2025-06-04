"use client";
import React, { useEffect, useState } from "react";

export default function CartSummary() {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("customizedCart");
    if (data) setSummaryData(JSON.parse(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Order Summary</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
        {summaryData.map((item, idx) => (
          <div key={idx} className="border p-3 rounded">
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <p>Quantity: {item.quantity}</p>

            {item.selectedSize && <p>Size: {item.selectedSize}</p>}

            {item.options?.addOns && (
              <p>
                Add-ons:{" "}
                {item.selectedAddOns.length > 0
                  ? item.selectedAddOns.join(", ")
                  : "None"}
              </p>
            )}

            {item.options?.crusts && (
              <p>Crust: {item.selectedCrust || "None"}</p>
            )}

            {item.options?.meats && (
              <p>
                Meats:{" "}
                {item.selectedMeats.length > 0
                  ? item.selectedMeats.join(", ")
                  : "None"}
              </p>
            )}

            {item.options?.veggies && (
              <p>
                Veggies:{" "}
                {item.selectedVeggies.length > 0
                  ? item.selectedVeggies.join(", ")
                  : "None"}
              </p>
            )}

            {item.options?.dips && (
              <p>
                Dips:{" "}
                {item.selectedDips.length > 0
                  ? item.selectedDips.join(", ")
                  : "None"}
              </p>
            )}

            {item.options?.flavors && (
              <p>Flavor: {item.selectedFlavors || "None"}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
