import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

function OrderSuccess() {
  const { id } = useParams(); // for COD or direct order success
  const location = useLocation(); // for Stripe redirect with ?session_id=...
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get("session_id");

      if (sessionId) {
  // ✅ Verify Stripe payment and update order status
  const res = await axiosInstance.get(
    `${API_PATHS.PAYMENT.VERIFY}/${sessionId}` // call verifyStripePayment route
  );
  setOrder(res.data.order); // this order now has status "paid" if payment succeeded
}
 else if (id) {
          // ✅ For normal COD order
          const res = await axiosInstance.get(API_PATHS.ORDER.GET_BY_ID(id));
          setOrder(res.data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, location.search]);

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (!order) return <Layout><p>Order not found or not paid yet.</p></Layout>;

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
        <p className="mt-2">
          Your order ID is <span className="font-mono">{order._id}</span>
        </p>
        <p>Total: Rs {order.total?.toFixed(2)}</p>
        <Link to="/orders/my-orders" className="mt-4 text-orange-500 underline">
          View My Orders
        </Link>
      </div>
    </Layout>
  );
}

export default OrderSuccess;
