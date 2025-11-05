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
      const redirectUrl = encodeURIComponent(
        location.pathname + location.search
      );
      navigate(`/auth/signin?redirect=${redirectUrl}`, { replace: true });
    }
  }, [user, loading, navigate, location]);

  // Load checkout items
useEffect(() => {
  const query = new URLSearchParams(location.search);
  const isBuyNow = query.get("buyNow") === "true";

  // Check sessionStorage first
  const storedItems = sessionStorage.getItem("checkoutItems");
  if (storedItems) {
    const parsedItems = JSON.parse(storedItems).map((item) => ({
      ...item,
      _id: item._id || item.id,
      productId: item.productId || item._id || item.id,
    }));
    setCheckoutItems(parsedItems);

  } else if (isBuyNow) {
    // Try to load buyNow from sessionStorage
    const storedBuyNow = sessionStorage.getItem("buyNowItem");
    if (storedBuyNow) {
      const item = JSON.parse(storedBuyNow);
      setCheckoutItems([item]);
    } else if (buyNow) {
      setCheckoutItems([buyNow]);
    } else {
      setCheckoutItems([]); // nothing to show
    }

  } else if (items.length > 0) {
    const fixedItems = items.map((item) => ({
      ...item,
      _id: item._id || item.id,
      productId: item.productId || item._id,
    }));
    setCheckoutItems(fixedItems);
  } else {
    setCheckoutItems([]);
  }
}, [items, buyNow, location.search]);



  if (loading || !user || checkoutItems.length === 0) return <h1>loading</h1>;

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

    const itemsToSend = checkoutItems.map((item) => ({
      product: item.productId || item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      seller: item.sellerId || item.seller , // ✅ add this li
    }));

    // 🔹 Stripe payment
    if (payment === "stripe") {
      try {
        const response = await axiosInstance.post(
          API_PATHS.PAYMENT.CREATE_CHECKOUT_SESSION,
          {
            items: itemsToSend,
            customerEmail: address.email,
            userId: user._id, // ✅ add this
            address,
          }
        );
        if (response.data.url) {
          window.location = response.data.url; // redirect to Stripe Checkout
        }
      } catch (err) {
     // <-- Replace this block with the new debug version
    console.error("Stripe checkout failed:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error(err.message);
    }
        alert("❌ Failed to initiate Stripe payment. Check console.");
      }
      return; // stop here, we redirect to Stripe
    }

    // 🔹 Cash on Delivery or other payments
    try {
      const response = await axiosInstance.post(API_PATHS.ORDER.CREATE, {
        items: itemsToSend,
        address,
        paymentMethod: payment,
        total: checkoutItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      });

      navigate(`/order-success/${response.data.orders[0]._id}`);
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
          <img src="/images/nepal-01-1.svg" alt="logo" className="h-10 w-10" />
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
