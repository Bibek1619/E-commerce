import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useUser } from "@/components/providers/userProvider";
import { useCart } from "@/components/providers/cart-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  ShoppingBag,
  Truck,
  Home,
  Wallet,
} from "lucide-react";

function CheckoutPage() {
  const { user, loading } = useUser();
  const { items, buyNow } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
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

  if (loading || !user) return null; // wait until loading finishes

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

  // Place order (fake handler)
  const handlePlaceOrder = () => {
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
    alert(
      `✅ Order placed!\n\nShipping to: ${address.street}, ${address.city}\nPayment: ${payment}\nTotal: $${total.toFixed(
        2
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* 🔹 Header bar */}
      <div className="bg-gray-800 py-4 px-6 fixed top-0 left-0 w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-orange-400"
        >
          <img src="/images/nepal-01-1.svg" alt="logo" className="h-10 w-10" />
          NepaliBazar
        </Link>
      </div>

      {/* 🔹 Main checkout content */}
      <div className="py-10 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Checkout Header */}
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
            Checkout
          </h1>

          {/* Items */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-semibold text-lg">Order Items</h2>
              {checkoutItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-orange-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-500" /> Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Street Address</Label>
                  <Input
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" /> Payment Method
              </h2>
              <RadioGroup value={payment} onValueChange={setPayment}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit / Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="esewa" id="esewa" />
                  <Label htmlFor="esewa">eSewa / Mobile Wallet</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right - Summary */}
        <div>
          <Card className="p-6 shadow-md sticky top-10">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              className="w-full mt-6 flex items-center gap-2"
              onClick={handlePlaceOrder}
            >
              <CreditCard className="w-5 h-5" />
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
