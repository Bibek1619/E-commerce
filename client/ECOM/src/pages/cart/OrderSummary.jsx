import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";

export default function OrderSummary({ selectedItems }) {
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 150; // fixed shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
   if (!selectedItems.length) return toast.error("Select items to checkout");
    // Save selected items to sessionStorage
    sessionStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    // Navigate to checkout page
    navigate("/checkout");
  };

  return (
    // ** Order Summary Card **//
    <Card className="p-6 shadow-md sticky top-10">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>Rs. {subtotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Shipping</span>
        <span className="text-green-600">Rs. {shipping.toLocaleString()}</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>Rs. {total.toLocaleString()}</span>
      </div>

      <Button
        className="w-full mt-6 flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white"
        onClick={handleCheckout}
        disabled={selectedItems.length === 0}
      >
        <CreditCard className="w-5 h-5" />
        Proceed to Checkout
      </Button>
    </Card>
  );
}
