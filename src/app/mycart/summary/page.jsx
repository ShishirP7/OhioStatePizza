"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

export default function CartSummary() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [carryoutInfo, setCarryoutInfo] = useState({
    timeOption: "asap",
    scheduledTime: "",
    address: "44 S Central Ave, Fairborn, OH 45324",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("success");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [savedEmail, setSavedEmail] = useState(null);

  //cart empty checker

  useEffect(() => {
    const storedEmail = localStorage.getItem("customerEmail");
    if (storedEmail) {
      setBillingInfo((prev) => ({ ...prev, email: storedEmail }));
      setSavedEmail(storedEmail);
    }

    if (cartItems.length === 0 && !savedEmail) {
      router.push("/");
    }
  }, [cartItems, router]);

  // Calculate total price

  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleCarryoutChange = (e) => {
    setCarryoutInfo({ ...carryoutInfo, [e.target.name]: e.target.value });
  };

  const generateTimeOptions = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const times = [];
    for (let hour = 10; hour < 20; hour++) {
      const baseHour = hour.toString().padStart(2, "0");

      // Add ":00" if it's a valid future time
      if (hour > currentHour || (hour === currentHour && currentMinute < 0)) {
        times.push(`${baseHour}:00`);
      }

      // Add ":30" only if the time hasn't passed
      if (hour > currentHour || (hour === currentHour && currentMinute < 30)) {
        times.push(`${baseHour}:30`);
      }
    }

    return times;
  };

  const handlePlaceOrder = () => {
    const { firstName, lastName, phone, email } = billingInfo;

    if (!firstName || !lastName || !phone || !email) return setModalError();
    if (carryoutInfo.timeOption === "scheduled" && !carryoutInfo.scheduledTime)
      return setModalError();

    setConfirmModalOpen(true);
  };
  const handleFinalSubmit = async () => {
    const orderPayload = {
      billingInfo,
      carryoutInfo,
      cartItems,
      paymentInfo: {
        method: "Credit Card",
        last4: "4242",
      },
      orderTotal: parseFloat(total),
    };

    try {
      const res = await axios.post(
        "https://66.94.97.165/api/orders",
        orderPayload
      );

      if (res.status === 201 || res.status === 200) {
        localStorage.setItem("customerEmail", billingInfo.email);
        setConfirmModalOpen(false);
        setModalStatus("success");
        setModalOpen(true);

        setTimeout(() => {
          router.push("/orders"); // ✅ relative path
          clearCart();
          setModalOpen(false);
        }, 5000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.log("Order submission error:", err.response?.data || err.message);
      setConfirmModalOpen(false);
      setModalStatus("error");
      setModalOpen(true);
    }
  };

  const setModalError = () => {
    setModalStatus("error");
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black py-8 px-4 flex justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Order Summary */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>
          {/* Carryout Info */}
          <CarryoutInfo
            carryoutInfo={carryoutInfo}
            handleCarryoutChange={handleCarryoutChange}
            generateTimeOptions={generateTimeOptions}
          />
          {/* Cart Items */}
          <CartItem cartItems={cartItems} />
        </div>

        {/* Right: Billing + Overview */}
        <BillingForm
          billingInfo={billingInfo}
          handleBillingChange={handleBillingChange}
          total={total}
          handlePlaceOrder={handlePlaceOrder}
          savedEmail={savedEmail}
        />
      </div>

      <OrderPlacedModal
        modalOpen={modalOpen}
        modalStatus={modalStatus}
        setModalOpen={setModalOpen}
      />

      <ConfirmOrderModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        billingInfo={billingInfo}
        carryoutInfo={carryoutInfo}
        total={total}
        onConfirm={handleFinalSubmit}
      />
    </div>
  );
}

// -- Carryout Info
const CarryoutInfo = ({
  carryoutInfo,
  handleCarryoutChange,
  generateTimeOptions,
}) => (
  <div className="space-y-4 mb-6">
    <div>
      <label className="block text-gray-700 font-semibold mb-1">
        Carryout Time
      </label>
      <select
        name="timeOption"
        value={carryoutInfo.timeOption}
        onChange={handleCarryoutChange}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="asap">As soon as possible</option>
        <option value="scheduled">Schedule for later</option>
      </select>
    </div>

    {carryoutInfo.timeOption === "scheduled" && (
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Select Time (10 AM - 8 PM)
        </label>
        <select
          name="scheduledTime"
          value={carryoutInfo.scheduledTime}
          onChange={handleCarryoutChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">-- Select Time --</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    )}

    <div>
      <label className="block text-gray-700 font-semibold mb-1">
        Carryout Address
      </label>
      <select
        name="address"
        value={carryoutInfo.address}
        onChange={handleCarryoutChange}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option>44 S Central Ave, Fairborn, OH 45324</option>
        <option>819 N Nelson Rd, Columbus, OH 43219</option>
      </select>
    </div>
  </div>
);

// -- Cart Items
const CartItem = ({ cartItems }) => (
  <div className="space-y-4">
    {cartItems.length === 0 ? (
      <p className="text-gray-600 text-center">Your cart is empty</p>
    ) : (
      cartItems.map((item, idx) => (
        <div
          key={idx}
          className="border rounded p-4 flex justify-between items-start"
        >
          <div className="space-y-1">
            <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
            {item.description && (
              <p className="text-sm text-gray-500 italic">{item.description}</p>
            )}
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            {item.selectedOptions &&
              Object.entries(item.selectedOptions).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0))
                  return null;
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                return (
                  <p key={key} className="text-sm text-gray-600">
                    {label}: {Array.isArray(value) ? value.join(", ") : value}
                  </p>
                );
              })}
            {item.items && item.items.length > 0 && (
              <div className="mt-2 pl-2 border-l-2 border-gray-300 space-y-1">
                <p className="font-semibold text-sm text-gray-700">Includes:</p>
                {item.items.map((subItem, subIdx) => (
                  <div key={subIdx}>
                    <p className="text-sm font-medium text-gray-800">
                      {subItem.name}
                    </p>
                    {subItem.description && (
                      <p className="text-xs text-gray-500 mb-1">
                        {subItem.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="font-bold text-gray-900">${item.totalPrice}</div>
        </div>
      ))
    )}
  </div>
);

// -- Billing Form
const BillingForm = ({
  billingInfo,
  handleBillingChange,
  total,
  handlePlaceOrder,
  savedEmail
}) => (
  <div className="bg-white rounded shadow p-6 space-y-4">
    <h2 className="text-lg font-bold text-gray-900">Billing Info</h2>

    <div className="space-y-3">
      {["firstName", "lastName", "phone"].map((field) => (
        <input
          key={field}
          name={field}
          type={
            field === "email" ? "email" : field === "phone" ? "tel" : "text"
          }
          placeholder={field
            .replace(/^\w/, (c) => c.toUpperCase())
            .replace(/([A-Z])/g, " $1")}
          value={billingInfo[field]}
          onChange={handleBillingChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      ))}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={billingInfo.email}
        onChange={handleBillingChange}
        disabled={!!savedEmail}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 ${
          savedEmail ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        required
      />
    </div>

    <h2 className="text-lg font-bold text-gray-900 mt-6">Order Overview</h2>
    <div className="flex justify-between text-sm text-gray-700">
      <span>Subtotal</span>
      <span>${total}</span>
    </div>
    <div className="flex justify-between text-sm text-gray-700">
      <span>Estimated Tax</span>
      <span>$0.00</span>
    </div>
    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-gray-900">
      <span>Order Total</span>
      <span>${total}</span>
    </div>

    <button
      onClick={handlePlaceOrder}
      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
    >
      Place Order
    </button>
  </div>
);

// -- Order Placed Modal
const OrderPlacedModal = ({ modalOpen, modalStatus, setModalOpen }) => (
  <Transition.Root show={modalOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={setModalOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 transition-opacity" />
      </Transition.Child>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">
          {modalStatus === "success" ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto" />
              </motion.div>
              <Dialog.Title className="text-xl font-bold text-gray-800">
                Order Placed Successfully!
              </Dialog.Title>
              <p className="text-gray-600">
                Redirecting to your orders page...
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <AiOutlineCloseCircle className="text-red-500 text-6xl mx-auto" />
              </motion.div>
              <Dialog.Title className="text-xl font-bold text-gray-800">
                Something went wrong!
              </Dialog.Title>
              <p className="text-gray-600">
                Please check your details and try again.
              </p>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  </Transition.Root>
);

// -- Confirm Order Modal
const ConfirmOrderModal = ({
  open,
  setOpen,
  billingInfo,
  carryoutInfo,
  total,
  onConfirm,
}) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 transition-opacity" />
      </Transition.Child>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold text-gray-800 text-center">
            Confirm Your Order
          </Dialog.Title>
          <div className="text-sm text-gray-700 space-y-1 mt-4">
            <p>
              <strong>Name:</strong> {billingInfo.firstName}{" "}
              {billingInfo.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {billingInfo.phone}
            </p>
            <p>
              <strong>Email:</strong> {billingInfo.email}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {carryoutInfo.timeOption === "scheduled"
                ? carryoutInfo.scheduledTime
                : "ASAP"}
            </p>
            <p>
              <strong>Address:</strong> {carryoutInfo.address}
            </p>
            <p className="font-bold">
              <strong>Total:</strong> ${total}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm & Place Order
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </Transition.Root>
);
