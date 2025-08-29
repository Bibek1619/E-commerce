// src/pages/seller/components/SellerHeader.jsx
import React from "react";
import { ShoppingBag, LogOut } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

export default function SellerHeader({ seller, onLogout }) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side logo + title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">NepalBazar</span>
          </div>
          <div className="h-6 w-px bg-gray-300" />
          <span className="text-gray-600">Seller Dashboard</span>
        </div>

        {/* Right side seller info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={seller?.shopPhoto || "/placeholder.svg"} />
              <AvatarFallback>{seller?.name ? seller.name.charAt(0) : "S"}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="text-gray-500">{seller?.shopName || ""}</p>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
