import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useUser } from "@/components/providers/userProvider";
import { useCart } from "@/components/providers/cart-provider";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

function CheckoutPage() {
  const { user, loading } = useUser();
  const { items, buyNow } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const [payment, setPayment] = useState("cod"); // default = Cash on Delivery

  // Handle login redirect
  useEffect(() => {
    if (!loading && !user) {
      const redirectUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/auth/signin?redirect=${redirectUrl}`, { replace: true });
    }
  }, [user, loading, navigate, location]);

  if (loading || !user) return null;

  // Extract query
  const query = new URLSearchParams(location.search);
  const isBuyNow = query.get("buyNow") === "true";

  // Items to display
  const checkoutItems = isBuyNow && buyNow ? [buyNow] : items;

  // Total price
  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Place order handler
const handlePlaceOrder = async () => {
  if (!address.fullName || !address.phone || !address.street || !address.city || !address.postalCode) {
    alert("Please fill in all shipping details!");
    return;
  }

  try {
    // Map items to include 'product' field for backend
    const itemsToSend = checkoutItems.map(item => ({
      product: item._id,  // <-- required by backend
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const response = await axiosInstance.post(API_PATHS.ORDER.CREATE, {
      items: itemsToSend,
      address,
      paymentMethod: payment,
      total,
    });

    navigate(`/order-success/${response.data._id}`);
  } catch (error) {
    alert("❌ Failed to place order: " + (error.response?.data?.message || error.message));
  }
};


  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <div className="bg-gray-800 py-4 px-6 fixed top-0 left-0 w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-orange-400"
        >
          <img src="/images/nepal-01-1.svg" alt="logo" className="h-10 w-10" />
          NepaliBazar
        </Link>
      </div>

      {/* Main */}
      <div className="py-10 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CheckoutForm
            checkoutItems={checkoutItems}
            address={address}
            setAddress={setAddress}
            payment={payment}
            setPayment={setPayment}
          />
        </div>

        <div>
          <OrderSummary
            total={total}
            address={address}
            payment={payment}
            handlePlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
