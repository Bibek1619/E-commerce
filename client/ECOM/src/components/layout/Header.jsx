import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Heart,
  X,
  MapPin,
  Bold,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // Replace with context later
  const cartCount = 0; // Replace with cart context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => setUser(null);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  const categories = [
    "Traditional Clothes",
    "Food Items",
    "Furniture",
    "Handicrafts",
    "Herbs",
    "Electronics",
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-800 py-1">
        <div className="container mx-auto px-4 flex justify-between text-xs sm:text-sm md:text-xs lg:text-sm text-white">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Deliver to Nepal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/seller/register" className="hover:text-orange-400">
              Sell on NepaliBazar
            </Link>
            <Link to="/help" className="hover:text-orange-400">
              Customer Service
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full px-4 py-2 flex items-center">
  {/* Logo */}
  <Link
  to="/"
  className="flex items-center gap-0 text-2xl md:text-2xl font-bold text-orange-400"
>
  <img src="/images/nepal-01-1.svg" alt="logo" className="h-9 w-10 "  />
  NepaliBazar
</Link>


  {/* User Actions */}
  <div className="flex items-center space-x-2 ml-auto">
<Button
 asChild
  variant="ghost"
  size="icon"
 
  className="relative hover:bg-amber-500 w-11 h-11"
>
  <Link to="/cart">
    <ShoppingCart className="h-7 w-7" />
    {cartCount > 0 && (
      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-600">
        {cartCount}
      </Badge>
    )}
  </Link>
</Button>



    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          size="icon"
          aria-label="User menu"
          className="hover:bg-amber-500 cursor-pointer"
        >
          <User className="h-9 w-9" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 bg-white">
        <DropdownMenuItem asChild>
          <Link to="/auth/signin" className="block w-full ">
            Sign In
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/auth/signup" className="block w-full">
            Sign Up
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>


 <div className="max-w-2xl mx-auto">

            <form onSubmit={handleSearch} className="flex">
     

              <Input
                type="text"
                placeholder="Search Nepali products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 
                rounded-none rounded-l-lg border-0 bg-white text-gray-900 mb-1.5 font-bold "
              />
              <Button type="submit" className="bg-orange-400 hover:bg-orange-500 rounded-l-none px-4 cursor-pointer ">
                <Search className="h-5 w-4"style={{ width: '20px', height: '28px',  }}  />
              </Button>
            </form>
          </div>


          
      
      {/* Categories bar */}
      <div className=" bg-gray-800 ">
        <div className="container mx-auto px-4 py-3 ">
          <div className=" md:flex items-center space-x-8 overflow-x-auto scrollbar-hidden">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(" ", "-")}`}
                className="whitespace-nowrap text-sm font-medium text-white hover:text-amber-500  "
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
    
    </header>
    
  );
};

export default Header;
