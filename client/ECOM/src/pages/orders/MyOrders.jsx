import React, { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "@/api/orderApi";
import Layout from "@/components/layout/Layout";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-2">
              View and track your order history
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="font-mono text-sm font-semibold text-gray-900">
                        {order._id}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Store name */}
                  <div className="px-6 py-3 border-b border-gray-200 bg-blue-50">
                    <p className="font-semibold text-blue-900">
                      Store: {order.items[0]?.product?.seller?.name || "Unknown Store"}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              Price: Rs {item.price.toFixed(2)}
                            </p>
                          </div>
                          <img
                            src={item.image || "/placeholder.png"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        Rs {order.total.toFixed(2)}
                      </span>
                    </div>

                    {/* Cancel Button */}
                    <div className="flex justify-end mt-4">
                      {["pending", "accepted"].includes(order.status) && (
                        <button
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Are you sure you want to cancel this order?"
                              )
                            )
                              return;
                            try {
                              await cancelOrder(order._id);
                              setOrders((prev) =>
                                prev.map((o) =>
                                  o._id === order._id
                                    ? { ...o, status: "cancelled" }
                                    : o
                                )
                              );
                              alert("Order cancelled successfully!");
                            } catch (err) {
                              console.error("Cancel failed:", err);
                              alert("Failed to cancel order");
                            }
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
