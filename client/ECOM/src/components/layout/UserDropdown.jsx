// components/UserDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "../providers/userProvider"; // Ensure this hook returns user & clearUser

const UserDropdown = () => {
  const { user, clearUser } = useUser();

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            aria-label="User menu"
            className="hover:bg-amber-500 cursor-pointer w-11 h-11"
          >
            <User style={{ height: "28px", width: "28px" }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          <DropdownMenuItem asChild>
            <Link to="/auth/signin" className="block w-full hover:bg-amber-500 cursor-pointer">
              Sign In
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/auth/signup" className="block w-full hover:bg-amber-500 cursor-pointer">
              Sign Up
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          aria-label="User menu"
          className="hover:bg-amber-500 cursor-pointer px-3 py-2 rounded-md text-white text-sm"
        >
          <User className="w-6 h-6 mr-1" />
          {user.name || "User"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="block w-full hover:bg-amber-500 cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="block w-full hover:bg-amber-500 cursor-pointer">
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/reviews" className="block w-full hover:bg-amber-500 cursor-pointer">
            My Reviews
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="block w-full hover:bg-amber-500 cursor-pointer">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="block w-full hover:bg-amber-500 cursor-pointer">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={clearUser}
          className="text-red-600 font-medium hover:bg-red-100 cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
