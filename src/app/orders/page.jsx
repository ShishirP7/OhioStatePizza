"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("customerEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return;
      try {
        const res = await axios.get(
          `http://66.94.97.165:4001/api/orders/customer/${encodeURIComponent(userEmail)}`
        );
        setOrders(res.data.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Order History</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading your orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const date = new Date(order.createdAt);
  const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">Placed on {formattedDate} at {formattedTime}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          order.status === "completed"
            ? "bg-green-100 text-green-700"
            : order.status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        <p className="mb-2"><span className="font-medium">Pickup Location:</span> {order.carryoutInfo.address}</p>
        <div className="mb-3">
          <p className="font-medium mb-1">Items Ordered:</p>
          <ul className="list-disc list-inside space-y-1">
            {order.cartItems.map((item, idx) => (
              <li key={idx}>
                {item.quantity}x {item.name}{" "}
                {item.selectedOptions && (
                  <span className="text-gray-500">
                    (
                    {Object.entries(item.selectedOptions).map(([key, value], index) => (
                      <span key={index}>{key}: {Array.isArray(value) ? value.join(", ") : value}{index < Object.entries(item.selectedOptions).length - 1 ? ", " : ""}</span>
                    ))}
                    )
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right text-base font-semibold text-gray-900">
          Total Paid: ${order.orderTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Orders;