"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CustomizeComboForm from "./modals/CustomizeComboform";

const Specials = () => {
  const [specials, setSpecials] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await fetch("https://api.ohiostatepizzas.com/api/specials");
        const data = await res.json();
        setSpecials(data);
      } catch (err) {
        console.log("Failed to fetch combos:", err);
      }
    };
    fetchCombos();
  }, []);

  return (
    <section className="w-full py-16 bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-red-500 font-bold text-xl mb-2 uppercase font-[cursive]">
          Specials Combo
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
          Our delicious burgers
        </h2>

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 hover:cursor-grab">
            {specials.map((combo) => (
              <div
                key={combo._id}
                className="group relative bg-white shadow-2xl rounded-xl p-6 md:py-20 flex flex-col justify-between items-center transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-90 z-0" />
                <div className="relative z-10 text-center mb-4">
                  <h4 className="text-xl font-extrabold text-black group-hover:text-white">
                    {combo.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-white">
                    {combo.description}
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-4 group-hover:text-white">
                    ${combo.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCombo(combo)}
                  className="relative z-10 bg-yellow-400 text-black group-hover:bg-yellow-400 group-hover:text-black mt-4 px-6 py-2 rounded-full flex items-center gap-2 shadow-md font-semibold transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  ORDER NOW
                </button>
                {/* <img
                  src={
                    combo.imageBase64
                      ? `data:image/png;base64,${combo.imageBase64}`
                      : "/burger.png"
                  }
                  alt={combo.name}
                  className="relative z-10 mt-6 h-36 object-contain"
                /> */}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Modal for customizing combo */}
        {selectedCombo && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setSelectedCombo(null)} // Close on outside click
          >
            <div
              className="bg-white p-6 rounded-lg max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCombo(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
              >
                &times;
              </button>

              {/* Combo customization form */}
              <CustomizeComboForm
                item={selectedCombo}
                onClose={() => setSelectedCombo(null)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Specials;
