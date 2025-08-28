import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../components/providers/cart-provider";
import { toast } from "react-hot-toast";

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b px-6 py-4 font-semibold text-lg ${className}`}>
    {children}
  </div>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children }) => <>{children}</>;

export default function CartPage() {
  const { items, loading, updateQuantity, removeItem, isLoggedIn } = useCart();
  const [selectedIds, setSelectedIds] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  const selectedItems = items.filter((item) => selectedIds.includes(item._id));
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 150;
  const tax = selectedTotal * 0.13;
  const finalTotal = selectedTotal + shipping + tax;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item._id));
    }
  };

  const removeSelected = () => {
    if (!isLoggedIn) return toast.error("Please login to remove items");
    selectedIds.forEach((id) => removeItem(id));
    setSelectedIds([]);
  };

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
            <Link to="/products">Continue Shopping</Link>
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
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle>Cart Items ({items.length})</CardTitle>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === items.length}
                        onChange={toggleSelectAll}
                        className="mr-2 h-5 w-5"
                      />
                      Select All
                    </label>
                    {selectedIds.length > 0 && (
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={removeSelected}
                      >
                        Remove Selected
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg items-center"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                        className="h-5 w-5"
                      />
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.seller && (
                          <p className="text-sm text-gray-600">
                            by {item.seller}
                          </p>
                        )}
                        <p className="text-lg font-bold text-orange-500 mt-1">
                          Rs. {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Button
                          size="sm"
                          className="border border-gray-300"
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          className="border border-gray-300"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="text-red-500 hover:text-red-700 border border-red-500 mt-2 sm:mt-0"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
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
                  <Link to={isLoggedIn ? "/checkout" : "#"}>
                    Proceed to Checkout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
