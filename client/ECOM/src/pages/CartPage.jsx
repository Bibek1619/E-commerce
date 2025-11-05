import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import CartItems from "./cart/CartItems";
import OrderSummary from "./cart/OrderSummary";

export default function CartPage() {
  const { items, loading } = useCart();
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedItems = items.filter((item) => selectedIds.includes(item._id));

  if (loading) return <div>Loading...</div>;

  if (!items.length)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="container mx-auto px-4 py-16 flex-grow text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Button className="bg-orange-400 hover:bg-orange-500 text-white">
            <Link to="/category/all">Continue Shopping</Link>
          </Button>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartItems
              items={items}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary selectedItems={selectedItems} />
          </div>
        </div>
      </main>
    </div>
  );
}
