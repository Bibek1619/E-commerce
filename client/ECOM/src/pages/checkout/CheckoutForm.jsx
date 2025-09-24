import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingBag, Home, Wallet } from "lucide-react";

function CheckoutForm({ checkoutItems, address, setAddress, payment, setPayment }) {
  return (
    <div className="space-y-6">
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
              key={item._id || item.name}
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
            <div>
              <Label>Email</Label>
             <input
  type="email"
  value={address.email}
  onChange={(e) => setAddress({ ...address, email: e.target.value })}
  placeholder="Email"
  className="w-full p-2 border rounded"
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
  );
}

export default CheckoutForm;
