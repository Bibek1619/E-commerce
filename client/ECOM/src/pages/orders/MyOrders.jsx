import React, { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "@/api/orderApi";
import Layout from "@/components/layout/Layout";
import ReviewModal from "@/components/ReviewModal";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [reviewProduct, setReviewProduct] = useState(null);

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

const getPaymentColor = (paymentMethod, paymentStatus) => {
  if (paymentMethod === "stripe" && paymentStatus === "paid") return "bg-green-100 text-green-800";
  if (paymentMethod === "stripe" && paymentStatus === "pending") return "bg-yellow-100 text-yellow-800";
  if (paymentMethod === "cod") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};


  const activeOrders = orders.filter(
    (o) => (activeTab === "orders" ? o.status !== "cancelled" : o.status === "cancelled")
  );

  if (loading) return <p className="text-center py-6">Loading orders...</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-md ${activeTab === "orders" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeTab === "cancelled" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                onClick={() => setActiveTab("cancelled")}
              >
                Cancelled Orders
              </button>
            </div>
          </div>

          {activeOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600 text-lg">
                {activeTab === "orders" ? "No active orders yet." : "No cancelled orders."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="font-mono text-sm font-semibold text-gray-900">{order._id}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                  </div>

                  <div className="p-6 space-y-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-600">Price: Rs {item.price.toFixed(2)}</p>
                        </div>
                        <img src={item.image || "/placeholder.png"} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-gray-600 font-medium">Total Amount</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">Rs {order.total.toFixed(2)}</span>
                      </div>
     <div className={`mt-2 px-3 py-1 w-max rounded-full text-sm font-medium ${getPaymentColor(order.paymentMethod, order.paymentStatus)}`}>
  {order.paymentMethod === "stripe"
    ? order.paymentStatus === "paid" ? "Paid via Stripe" : "Pending Payment"
    : "Cash on Delivery"}
</div>

                    </div>

                    {/* Review button for delivered items */}
               {order.status === "delivered" && order.items.length > 0 && (
  <div className="flex justify-end mt-4">
    <button
      onClick={() =>
        setReviewProduct(order.items[0]?.product || order.items[0]?._id)
      }
      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition"
    >
      Review Product
    </button>
  </div>
)}

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Modal */}
        {reviewProduct && (
          <ReviewModal
            productId={reviewProduct}
            onClose={() => setReviewProduct(null)}
            onSuccess={() => console.log("Review submitted")}
          />
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
