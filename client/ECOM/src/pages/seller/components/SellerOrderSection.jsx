// src/pages/seller/SellerOrdersSection.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function SellerOrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch seller orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(API_PATHS.ORDER.GET_SELLER_ORDERS);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(API_PATHS.ORDER.UPDATE_STATUS(orderId), { status: newStatus });
      toast.success(`Order status updated to "${newStatus}"`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders yet.</p>;

  const statusOptions = ["pending", "accepted", "processing", "shipped", "delivered", "cancelled"];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-500";
      case "accepted":
        return "text-blue-600";
      case "processing":
        return "text-purple-600";
      case "shipped":
        return "text-indigo-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPaymentStatusText = (order) => {
    if (order.paymentMethod === "cod") return "Cash on Delivery";
    if (order.paymentMethod === "stripe") return order.paymentStatus || "Paid via Stripe";
    return "Unknown";
  };

  const getPaymentStatusColor = (order) => {
    if (order.paymentMethod === "cod") return "text-yellow-600";
    if (order.paymentMethod === "stripe") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order._id} className="border">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-600">
                  Buyer: {order.user?.name || "Unknown"}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className={getStatusColor(order.status)}>
                    {order.status}
                  </span>
                </p>
                <p className="text-sm">
                  Payment:{" "}
                  <span className={getPaymentStatusColor(order)}>
                    {getPaymentStatusText(order)}
                  </span>
                </p>
                {order.paymentMethod === "stripe" && order.stripeSessionId && (
                  <p className="text-xs text-gray-500">
                    Session ID: {order.stripeSessionId}
                  </p>
                )}
              </div>

              {/* Status Dropdown (disabled if cancelled) */}
              {order.status !== "cancelled" && (
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Items */}
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              {order.items.map((item) => (
                <p key={item.product._id}>
                  {item.name} × {item.quantity} — Rs {item.price.toFixed(2)}
                </p>
              ))}
            </div>

            {/* Total */}
            <div className="mt-2 font-semibold text-gray-900">
              Total: Rs {order.total.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
