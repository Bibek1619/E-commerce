import React, { useState } from "react";
import { ShoppingCart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import UserDropdown from "./UserDropdown";
import { useCart } from "../providers/cart-provider";
import SearchBar from "../searching/SearchBar";

const Header = () => {
  const [user, setUser] = useState(null);
  const { items } = useCart();
  const cartCount = items.length;

  const categories = [
    "All",
    "Traditional Clothes",
    "Food-Item",
    "Furniture",
    "Handicrafts",
    "Herbs",
    "Electronics",
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      {/* Top Bar */}
      <div className="bg-gray-800 py-1">
        <div className="container mx-auto px-4 flex justify-between text-xs sm:text-sm text-white">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Deliver to Nepal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/SignUp?role=seller" className="hover:text-orange-400">
              Sell on NepaliBazar
            </Link>
            <Link to="/help" className="hover:text-orange-400">
              Customer Service
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center gap-4 md:gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-amber-600 flex-shrink-0"
        >
          <img src="/images/nepal-01-1.svg" alt="logo" className="h-10 w-10" />
          NepaliBazar
        </Link>

        {/* Search Bar */}
        <div className="flex-1 hidden md:block">
          <SearchBar />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative hover:bg-amber-500 w-11 h-11"
          >
            <Link to="/cart">
              <ShoppingCart className="text-white" style={{ width: "28px", height: "28px" }} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-600">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          <UserDropdown />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-4 md:hidden">
        <SearchBar />
      </div>

      {/* Categories Bar */}
      <div className="bg-gray-800">
        <div className="container mx-auto px-4 py-3 overflow-x-auto scrollbar-hidden">
          <div className="flex items-center space-x-6 whitespace-nowrap">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-white hover:text-amber-500"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
