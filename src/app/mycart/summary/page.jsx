"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({
  billingInfo,
  carryoutInfo,
  cartItems,
  total,
  clientSecret,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${billingInfo.firstName} ${billingInfo.lastName}`,
            email: billingInfo.email,
            phone: billingInfo.phone,
          },
        },
      }
    );

    if (error) {
      onError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-lg p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay $${total}`
        )}
      </button>
    </form>
  );
};

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
    address: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [savedEmail, setSavedEmail] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [serviceType, setServiceType] = useState("Carryout");
  const [userZipCode, setUserZipCode] = useState("");
  const [userDeliveryAddress, setUserDeliveryAddress] = useState("");
  const [storeAddress, setStoreAddress] = useState(""); // for carryout
  // Calculate total price
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.totalPrice),
    0
  );

  const deliveryFee = serviceType === "Delivery" ? 3 : 0;

  const total = (cartSubtotal + deliveryFee).toFixed(2);

  useEffect(() => {
    axios
      .get("https://api.ohiostatepizzas.com/api/stores")
      .then((res) => setStores(res.data || []))
      .catch((err) => console.error("Error loading stores:", err));
  }, []);

  useEffect(() => {
    const savedStoreId = localStorage.getItem("userStoreId");
    const savedServiceType = localStorage.getItem("userLocation") || "Carryout";
    const savedZip = localStorage.getItem("userZipCode") || "";

    setServiceType(savedServiceType);
    setUserZipCode(savedZip);

    if (savedStoreId) {
      setSelectedStoreId(savedStoreId);
    }

    const savedDeliveryAddress = localStorage.getItem("userDeliveryAddress");
    if (savedDeliveryAddress) {
      try {
        const parsed = JSON.parse(savedDeliveryAddress);
        if (parsed?.street && parsed?.zip) {
          const fullAddress = `${parsed.street}, ${parsed.city}, ${parsed.zip}`;
          setUserDeliveryAddress(fullAddress);
        }
      } catch (err) {
        console.error("Failed to parse delivery address:", err);
      }
    }
  }, []);

  // Create payment intent when component mounts or total changes

  useEffect(() => {
    if (total > 0) {
      axios
        .post(
          "https://api.ohiostatepizzas.com/api/payment/create-payment-intent",
          {
            amount: Math.round(parseFloat(total)), // Convert to cents
          }
        )
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setModalStatus("error");
          setModalMessage("Failed to initialize payment system");
          setModalOpen(true);
        });
    }
  }, [total]);

  // Check for saved email and empty cart
  useEffect(() => {
    const storedEmail = localStorage.getItem("customerEmail");
    if (storedEmail) {
      setBillingInfo((prev) => ({ ...prev, email: storedEmail }));
      setSavedEmail(storedEmail);
    }

    if (cartItems.length === 0 && !savedEmail) {
      router.push("/");
    }
  }, [cartItems, router, savedEmail]);

  useEffect(() => {
    if (serviceType === "Carryout" && selectedStoreId && stores.length > 0) {
      const store = stores.find((s) => s._id === selectedStoreId);
      if (store?.address?.formatted) {
        setStoreAddress(store.address.formatted);
      }
    }
  }, [serviceType, selectedStoreId, stores]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarryoutChange = (e) => {
    const { name, value } = e.target;
    setCarryoutInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generateTimeOptions = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const times = [];
    for (let hour = 10; hour < 20; hour++) {
      const baseHour = hour.toString().padStart(2, "0");

      if (hour > currentHour || (hour === currentHour && currentMinute < 0)) {
        times.push(`${baseHour}:00`);
      }

      if (hour > currentHour || (hour === currentHour && currentMinute < 30)) {
        times.push(`${baseHour}:30`);
      }
    }
    return times;
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email } = billingInfo;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !phone || !email) {
      setModalMessage("Please fill in all required fields");
      return false;
    }

    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address");
      return false;
    }

    if (serviceType === "Delivery") {
      if (!userDeliveryAddress || userDeliveryAddress.trim() === "") {
        setModalMessage("Please enter your delivery address");
        return false;
      }
      if (!userZipCode || userZipCode.length !== 5) {
        setModalMessage("Invalid delivery ZIP code");
        return false;
      }
    }

    if (
      carryoutInfo.timeOption === "scheduled" &&
      !carryoutInfo.scheduledTime
    ) {
      setModalMessage("Please select a scheduled time");
      return false;
    }

    return true;
  };

  const buildFinalPayload = () => ({
    serviceType,
    billingInfo,
    carryoutInfo: {
      ...carryoutInfo,
      address: serviceType === "Delivery" ? userDeliveryAddress : storeAddress,
    },
    cartItems,
    paymentInfo: {
      method: "Credit Card",
      status: "pending",
    },
    orderTotal: parseFloat(total),
  });

  console.log("Final Payload:", buildFinalPayload());

  const handlePlaceOrder = () => {
    setCarryoutInfo((prev) => ({
      ...prev,
      address: serviceType === "Delivery" ? userDeliveryAddress : storeAddress,
    }));

    if (!validateForm()) {
      setModalStatus("error");
      setModalOpen(true);
      return;
    }

    setConfirmModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    setPaymentProcessing(true);
    try {
      const orderPayload = {
        serviceType,
        billingInfo,
        carryoutInfo: {
          ...carryoutInfo,
          address:
            serviceType === "Delivery" ? userDeliveryAddress : storeAddress,
        },

        cartItems,
        paymentInfo: {
          method: "Credit Card",
          status: "completed",
        },
        orderTotal: parseFloat(total),
      };

      const res = await axios.post(
        "https://api.ohiostatepizzas.com/api/orders",
        orderPayload
      );

      if (res.status === 201 || res.status === 200) {
        localStorage.setItem("customerEmail", billingInfo.email);
        setModalStatus("success");
        setModalMessage("Order placed successfully!");
        setModalOpen(true);
        setConfirmModalOpen(false);

        setTimeout(() => {
          router.push("/orders");
          clearCart();
          setModalOpen(false);
        }, 3000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Order submission error:", err);
      setModalStatus("error");
      setModalMessage("Failed to place order. Please try again.");
      setModalOpen(true);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handlePaymentError = (error) => {
    setModalStatus("error");
    setModalMessage(error || "Payment failed. Please try again.");
    setModalOpen(true);
  };

  const selectedStore = stores.find((s) => s._id === selectedStoreId);

  return (
    <div className="min-h-screen bg-gray-50 text-black py-8 px-4 flex justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Order Summary */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Service Type
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setServiceType("Carryout")}
                className={`px-4 py-2 rounded ${
                  serviceType === "Carryout"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Carryout
              </button>
              <button
                type="button"
                onClick={() => setServiceType("Delivery")}
                className={`px-4 py-2 rounded ${
                  serviceType === "Delivery"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Delivery
              </button>
            </div>
          </div>

          {/* Carryout Info */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Carryout Time
              </label>
              <select
                name="timeOption"
                value={carryoutInfo.timeOption}
                onChange={handleCarryoutChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
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

            {serviceType === "Carryout" ? (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Carryout Store
                </label>
                <input
                  type="text"
                  value={storeAddress}
                  disabled
                  className="w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={userDeliveryAddress}
                  onChange={(e) => setUserDeliveryAddress(e.target.value)}
                  placeholder="Enter Delivery Address"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div className="space-y-1">
                    <h2 className="font-bold text-lg text-gray-800">
                      {item.name}
                    </h2>
                    {item.description && (
                      <p className="text-sm text-gray-500 italic">
                        {item.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    {item.selectedOptions &&
                      Object.entries(item.selectedOptions)
                        .filter(
                          ([_, value]) =>
                            value && (!Array.isArray(value) || value.length > 0)
                        )
                        .map(([key, value]) => (
                          <p key={key} className="text-sm text-gray-600">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                            {Array.isArray(value) ? value.join(", ") : value}
                          </p>
                        ))}
                    {item.items?.length > 0 && (
                      <div className="mt-2 pl-2 border-l-2 border-gray-300 space-y-1">
                        <p className="font-semibold text-sm text-gray-700">
                          Includes:
                        </p>
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
                  <div className="font-bold text-gray-900">
                    ${item.totalPrice}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Billing + Payment */}
        <div className="space-y-4">
          {/* Billing Form */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Billing Info</h2>

            <div className="space-y-3">
              {["firstName", "lastName", "phone"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="sr-only">
                    {field
                      .replace(/^\w/, (c) => c.toUpperCase())
                      .replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === "phone" ? "tel" : "text"}
                    placeholder={field
                      .replace(/^\w/, (c) => c.toUpperCase())
                      .replace(/([A-Z])/g, " $1")}
                    value={billingInfo[field]}
                    onChange={handleBillingChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              ))}

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={billingInfo.email}
                  onChange={handleBillingChange}
                  disabled={!!savedEmail}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    savedEmail ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-800">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {serviceType === "Delivery" && (
                <div className="flex justify-between text-gray-800">
                  <span>Delivery Fee</span>
                  <span>$3.00</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-200 pt-2">
                <span>Order Total</span>
                <span>${total}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Continue to Payment
            </button>
          </div>

          {/* Payment Form (only visible in confirm modal) */}
        </div>
      </div>

      {/* Order Status Modal */}
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setModalOpen(false)}
        >
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
                  <Dialog.Title className="text-xl font-bold text-gray-800 mt-4">
                    {modalMessage || "Order Placed Successfully!"}
                  </Dialog.Title>
                  <p className="text-gray-600 mt-2">
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
                  <Dialog.Title className="text-xl font-bold text-gray-800 mt-4">
                    {modalMessage || "Something went wrong!"}
                  </Dialog.Title>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Close
                  </button>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Order Confirmation Modal */}
      <Transition.Root show={confirmModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => !paymentProcessing && setConfirmModalOpen(false)}
        >
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

              <div className="text-sm text-gray-700 space-y-2 mt-4">
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
                  <p>
                    <strong>Address:</strong>{" "}
                    {serviceType === "Delivery"
                      ? userDeliveryAddress
                      : storeAddress}
                  </p>
                </p>
                <p>
                  <strong>Subtotal:</strong> ${cartSubtotal.toFixed(2)}
                </p>
                {serviceType === "Delivery" && (
                  <p>
                    <strong>Delivery Fee:</strong> $3.00
                  </p>
                )}
                <p className="font-bold pt-2">
                  <strong>Total:</strong> ${total}
                </p>
              </div>

              {clientSecret && (
                <Elements
                  stripe={loadStripe(stripePromise)}
                  options={{ clientSecret }}
                >
                  <CheckoutForm
                    billingInfo={billingInfo}
                    carryoutInfo={carryoutInfo}
                    cartItems={cartItems}
                    total={total}
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              )}

              {!clientSecret && (
                <div className="mt-4 text-center text-gray-500">
                  Loading payment information...
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
