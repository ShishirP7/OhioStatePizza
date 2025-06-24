"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const sampleOrders = [
    {
      id: "ORD123",
      date: "June 20, 2025",
      time: "12:45 PM",
      total: "29.99",
      status: "Confirmed",
      address: "44 S Central Ave, Fairborn, OH 45324",
      items: [
        {
          name: "Pepperoni Pizza",
          quantity: 1,
          selectedOptions: {
            size: "Large",
            crust: "Thin",
            addOns: ["Extra Cheese"]
          }
        },
        {
          name: "Garlic Bread",
          quantity: 2
        }
      ]
    },
    {
      id: "ORD124",
      date: "June 21, 2025",
      time: "2:10 PM",
      total: "15.50",
      status: "Preparing",
      address: "819 N Nelson Rd, Columbus, OH 43219",
      items: [
        {
          name: "Veggie Pizza",
          quantity: 1,
          selectedOptions: {
            size: "Medium",
            crust: "Stuffed"
          }
        }
      ]
    }
  ];

  useEffect(() => {
    // axios.get("/api/orders").then((res) => setOrders(res.data));
    setOrders(sampleOrders);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Order History</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">Placed on {order.date} at {order.time}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          order.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {order.status}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        <p className="mb-2"><span className="font-medium">Pickup Location:</span> {order.address}</p>
        <div className="mb-3">
          <p className="font-medium mb-1">Items Ordered:</p>
          <ul className="list-disc list-inside space-y-1">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.quantity}x {item.name}{" "}
                {item.selectedOptions && (
                  <span className="text-gray-500">
                    (
                    {item.selectedOptions.size && `Size: ${item.selectedOptions.size}, `}
                    {item.selectedOptions.crust && `Crust: ${item.selectedOptions.crust}, `}
                    {item.selectedOptions.addOns && item.selectedOptions.addOns.length > 0 &&
                      `Add-ons: ${item.selectedOptions.addOns.join(", ")}`}
                    )
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right text-base font-semibold text-gray-900">
          Total Paid: ${order.total}
        </div>
      </div>
    </div>
  );
};

export default Orders;
