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
        <h3 className="text-orange-600 font-bold text:sm md:text-xl mb-2 uppercase tracking-widest">
          Double the Fun, Cut the Price!
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
          Combo Specials
        </h2>

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {specials.map((combo) => (
              <div
                key={combo._id}
                className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 group"
              >
                {combo.image && (
                  <img
                    src={combo.image.startsWith("data") ? combo.image : `data:image/jpeg;base64,${combo.image}`}
                    alt={combo.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                )}
                <div className="p-5 text-left">
                  <h4 className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
                    {combo.name}
                  </h4>
                  {combo.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {combo.description}
                    </p>
                  )}

                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-semibold">Includes:</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {combo.items.map((ci, i) => (
                        <li key={i}>
                          <span className="font-semibold">
                            {ci.item?.name || "Unknown Item"}
                          </span>
                          {/* {ci.toppings?.length > 0 && (
                            <ul className="ml-5 mt-1 list-[circle] text-xs text-gray-600">
                              {ci.toppings.map((top, j) => (
                                <li key={j}>
                                  {top.name}
                                  {top.extraPrice > 0 && (
                                    <span>
                                      {" "}(+${top.extraPrice.toFixed(2)})
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )} */}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-lg font-bold text-orange-600">
                    ${combo.price.toFixed(2)}
                  </p>

                  <button
                    onClick={() => setSelectedCombo(combo)}
                    className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 font-semibold hover:bg-orange-600 transition"
                  >
                    <ShoppingCart className="w-5 h-5" /> ORDER NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {selectedCombo && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setSelectedCombo(null)}
          >
            <div
              className="bg-white p-6 rounded-lg max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCombo(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
              >
                &times;
              </button>
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
