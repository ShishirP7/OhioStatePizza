// components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-white pt-28 pb-6 relative overflow-hidden">
      {/* Top Torn Effect */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-[url('/tore.png')] bg-repeat-x bg-bottom bg-contain z-40 pointer-events-none rotate-180" />

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <img
            src="ohio-state-pizza-logo-1.webp"
            alt="Ohio State Pizza"
            width={160}
            height={80}
            className="mx-auto"
          />
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold text-lg mb-3">Address</h4>

            <p className="text-sm text-gray-300 mb-3">
              <span className="font-semibold text-white">Hudson Store</span><br />
              325 E Hudson St,<br />
              Columbus, OH 43202<br />
              PH: (614) 268-8181
            </p>

            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Nelson Store</span><br />
              819 N Nelson Rd,<br />
              Columbus, OH 43219<br />
              PH: (380) 268-8828
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Important Pages</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="hover:text-white transition">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/order" className="hover:text-white transition">
                  Order Online
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="font-bold text-lg mb-3">Opening hours</h4>
            <p className="text-sm text-gray-300">Mon – Thu: 10:30 AM – 2:30 AM</p>
            <p className="text-sm text-gray-300">Fri & Sat: 10:30 AM – 3:15 AM</p>
            <p className="text-sm text-gray-300">Sun: 11:00 AM – 2:30 AM</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Instagram feed</h4>
            <div className="text-sm text-gray-400">Coming soon...</div>
            <div className="text-sm text-gray-400">Coming soon...</div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Copyright & Developer Credit */}
        <div className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} All rights reserved by OHS Pizza LLC
          <span className="mx-2">|</span>
          Proudly developed by{" "}
          <a
            href="https://mrkters.com/?source=client&campaign=ohs-pizza-web"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition"
          >
            Mrkters.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
