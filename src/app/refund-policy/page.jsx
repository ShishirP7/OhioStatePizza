"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">Refund Policy</h1>

        <section className="mb-8">
          <p className="text-gray-700">
            At <strong>Ohio State Pizza</strong>, customer satisfaction is important to us. We work hard to ensure every order is prepared correctly and delivered in a timely manner. However, due to the nature of food products, we have a limited refund policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">1. No Refunds for Completed Orders</h2>
          <p className="text-gray-700">
            Once an order is prepared and delivered or picked up, it cannot be returned or refunded. Please review your order carefully before confirming your purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">2. Wrong or Missing Items</h2>
          <p className="text-gray-700">
            If your order is incorrect, incomplete, or missing items, please contact us immediately at{" "}
            <a href="mailto:connect@ohiostatepizzas.com" className="text-blue-600 underline">
              connect@ohiostatepizzas.com
            </a>{" "}
            or call the store directly. We will investigate and, if appropriate, offer a replacement or store credit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">3. Quality Issues</h2>
          <p className="text-gray-700">
            If you believe the quality of the food did not meet expectations, please contact us within 2 hours of receiving your order. We may ask for photos or additional details to evaluate the issue before offering a resolution.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">4. Delayed or Failed Delivery</h2>
          <p className="text-gray-700">
            If your order was not delivered due to incorrect address or failure to respond to driver calls, no refund will be issued. For late deliveries caused by our team or partners, we may offer partial credit at our discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">5. Third-Party Orders</h2>
          <p className="text-gray-700">
            If your order was placed through a third-party service (e.g. DoorDash, Uber Eats), please contact them directly for refund inquiries as we cannot process refunds for their platforms.
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

export default RefundPolicy;
