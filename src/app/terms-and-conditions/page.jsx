"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">Terms & Conditions</h1>

        <section className="mb-8">
          <p className="text-gray-700">
            Welcome to <strong>Ohio State Pizza</strong>. By accessing our website or placing an order, you agree to the following terms and conditions. Please read them carefully.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">1. General</h2>
          <p className="text-gray-700">
            These terms govern your use of our website and services. We reserve the right to change or update these terms at any time without prior notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">2. Orders & Payments</h2>
          <p className="text-gray-700">
            All orders must be paid in full at the time of purchase. We accept various forms of payment including credit/debit cards and online payment gateways. Prices are subject to change without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">3. Delivery & Pickup</h2>
          <p className="text-gray-700">
            Delivery times are estimates and may vary due to traffic or weather. It's your responsibility to provide accurate delivery information. Orders placed outside our delivery zones may not be fulfilled.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">4. Cancellations & Refunds</h2>
          <p className="text-gray-700">
            Once an order is placed, it cannot be canceled if preparation has begun. Refunds are handled on a case-by-case basis. Please contact us immediately if there is an issue with your order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">5. Allergies & Dietary Restrictions</h2>
          <p className="text-gray-700">
            Our kitchen handles a variety of ingredients. We cannot guarantee an allergen-free environment. Please inform us of any allergies or dietary restrictions before placing your order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">6. Intellectual Property</h2>
          <p className="text-gray-700">
            All content on our website, including logos, images, and text, is the property of OHS Pizza LLC and may not be used without written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">7. Limitation of Liability</h2>
          <p className="text-gray-700">
            OHS Pizza LLC is not liable for any damages arising from the use of our website or services. We strive to provide accurate information, but we do not guarantee the completeness or reliability of all content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns regarding these terms, feel free to contact us at{" "}
            <a href="mailto:connect@ohiostatepizzas.com" className="text-blue-600 underline">
              connect@ohiostatepizzas.com
            </a>.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-10 text-center">
          Last updated: July 8, 2025
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
