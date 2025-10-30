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
  const { buyNow, items } = useCart();
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
  const [checkoutItems, setCheckoutItems] = useState([]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      const redirectUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/auth/signin?redirect=${redirectUrl}`, { replace: true });
    }
  }, [user, loading, navigate, location]);

  // Load checkout items
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const isBuyNow = query.get("buyNow") === "true";

    // Check sessionStorage first (from CartPage)
    const storedItems = sessionStorage.getItem("checkoutItems");
    if (storedItems) {
      setCheckoutItems(JSON.parse(storedItems));
      sessionStorage.removeItem("checkoutItems"); // optional
    } else if (isBuyNow && buyNow) {
      setCheckoutItems([buyNow]);
    } else {
      setCheckoutItems(items);
    }
  }, [items, buyNow, location.search]);

  if (loading || !user || checkoutItems.length === 0) return null;

  // Total calculation
  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Place order
  const handlePlaceOrder = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.postalCode
    ) {
      alert("Please fill in all shipping details!");
      return;
    }
  // 🔹 Add this debug log here
  console.log("checkoutItems before mapping:", checkoutItems);
  checkoutItems.forEach(item => {
    if (!item.productId) console.warn("Missing productId for item:", item);
  });
    try {
      const itemsToSend = checkoutItems.map((item) => ({
  product:  item.productId,  // ensure this is the Product _id
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: item.image,
}));
   const missing = itemsToSend.filter((i) => !i.product);
    if (missing.length > 0) {
      console.error("Missing product IDs:", missing);
      alert("Some items are missing Product IDs. Check console.");
      return;
    }
      const response = await axiosInstance.post(API_PATHS.ORDER.CREATE, {
        items: itemsToSend,
        address,
        paymentMethod: payment,
        total,
      });

      navigate(`/order-success/${response.data._id}`);
    } catch (error) {
      alert(
        "❌ Failed to place order: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 py-4 px-6 fixed top-0 left-0 w-full z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-orange-400"
        >
          <img
            src="/images/nepal-01-1.svg"
            alt="logo"
            className="h-10 w-10"
          />
          NepaliBazar
        </Link>
      </div>

      {/* Main */}
      <div className="pt-24 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2">
          <CheckoutForm
            checkoutItems={checkoutItems}
            address={address}
            setAddress={setAddress}
            payment={payment}
            setPayment={setPayment}
          />
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary
            checkoutItems={checkoutItems}
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
