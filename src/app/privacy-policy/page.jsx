import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
        <Navbar/>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">Privacy Policy</h1>

        <p className="text-gray-700 mb-6">
          At <strong>Ohio State Pizza</strong>, we are committed to protecting your personal information and your right to privacy.
          This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website or place an order with us.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">1. Information We Collect</h2>
          <p className="text-gray-700">
            We may collect information that you provide directly to us when placing an order, contacting us, or subscribing to updates. This includes:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Delivery address</li>
            <li>Payment details (processed securely through third-party services)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">2. How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Process and deliver your orders</li>
            <li>Communicate order updates or promotions</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and ensure secure transactions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">3. Sharing Your Data</h2>
          <p className="text-gray-700">
            We do not sell your personal data. We may share your data with trusted third-party service providers (e.g. payment processors or delivery partners)
            to complete your order securely.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">4. Cookies & Tracking</h2>
          <p className="text-gray-700">
            We may use cookies and similar tracking technologies to enhance your experience and analyze site traffic.
            You can adjust your browser settings to manage cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">5. Data Security</h2>
          <p className="text-gray-700">
            Your data is protected using reasonable technical and organizational measures. However, no online system is ever completely secure,
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">6. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, correct, or delete your personal data.
            To exercise your rights, please contact us at{' '}
            <a href="mailto:connect@ohiostatepizzas.com" className="text-blue-600 underline">
              connect@ohiostatepizzas.com
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">7. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-10 text-center">
          Last updated: July 4, 2025
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
