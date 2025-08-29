import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import  {Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";

export default function OrderSummary({ selectedItems }) {
  const { isLoggedIn } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 150;
  const tax = selectedTotal * 0.13;
  const finalTotal = selectedTotal + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal (Selected Items)</span>
          <span>Rs. {selectedTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Rs. {shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (13%)</span>
          <span>Rs. {tax.toFixed(0)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs. {finalTotal.toFixed(0)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <Button className="w-full bg-transparent border border-orange-400 text-orange-500 hover:bg-orange-100">
            Apply Code
          </Button>
        </div>

        <Button
          className={`w-full text-white ${
            isLoggedIn
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isLoggedIn || selectedItems.length === 0}
        >
          <Link to={isLoggedIn ? "/checkout" : "#"}>Proceed to Checkout</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
