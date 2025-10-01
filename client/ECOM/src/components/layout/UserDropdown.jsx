// UserDropdown.jsx
import React, { useState } from "react";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useUser } from "../providers/userProvider";
import AuthModal from "../auth/AuthModal";
import Login from "@/pages/Auth/user/Login";
import SignUp from "@/pages/Auth/user/SignUp";

const UserDropdown = () => {
  const { user, clearUser } = useUser();
  const [modalType, setModalType] = useState(null); // "login" or "signup"

  const isModalOpen = !!modalType;

  // Logged out
  if (!user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              aria-label="User menu"
              className="hover:bg-amber-500 cursor-pointer w-11 h-11"
            >
              <User style={{ width: 28, height: 28 }} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 bg-white">
            <DropdownMenuItem onClick={() => setModalType("login")}>
              Sign In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModalType("signup")}>
              Sign Up
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

       <AuthModal
  open={isModalOpen}
  onClose={() => setModalType(null)}
  title={modalType === "login" ? "Sign In" : "Sign Up"}
>
  {modalType === "login" && (
    <Login
      onSuccess={() => setModalType(null)}
      switchToSignup={() => setModalType("signup")} // ✅ pass function here
    />
  )}
  {modalType === "signup" && (
    <SignUp
      onSuccess={() => setModalType(null)}
      switchToLogin={() => setModalType("login")} // ✅ pass function here
    />
  )}
</AuthModal>

      </>
    );
  }

  // Logged in
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
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
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
