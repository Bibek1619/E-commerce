import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

function OrderSummary({ total, address, payment, handlePlaceOrder }) {
  return (
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
  );
}

export default OrderSummary;
