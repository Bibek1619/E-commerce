import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button"; // optional if you move Button to /ui/Button.jsx
import  { Card,CardHeader, CardContent, CardTitle } from "@/components/ui/Card"; // optional if you move Card to /ui/Card.jsx

export default function CartItems({ items, selectedIds, setSelectedIds }) {
  const { updateQuantity, removeItem, isLoggedIn } = useCart();

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

  return (
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
                  <p className="text-sm text-gray-600">by {item.seller}</p>
                )}
                <p className="text-lg font-bold text-orange-500 mt-1">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button
                  className="border border-gray-300"
onClick={() => updateQuantity(item.id, item.quantity - 1)}


                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  className="border border-gray-300"
onClick={() => updateQuantity(item.id, item.quantity + 1)}


                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
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
  );
}
