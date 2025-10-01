import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/components/providers/userProvider";

const Login = ({ onSuccess,switchToSignup }) => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);

      if (response.status !== 200 || !response.data.token) {
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      const { token } = response.data;
      localStorage.setItem("token", token);

      await refreshUser();
      toast.success("Signed in successfully!");

      // ✅ close modal if inside one
      if (onSuccess) {
        onSuccess();
      } else {
        // ✅ fallback: redirect normally if no modal
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);
      localStorage.removeItem("token");

      if (error.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-md bg-[#796e56]">
    
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            className="text-sm text-orange-500 hover:underline"
            onClick={() => toast("Forgot password popup not implemented yet!")}
          >
            Forgot your password?
          </button>
          <p className="mt-4 text-center text-sm">
  Don't have an account?{" "}
  <button
    type="button"
    className="text-orange-500 hover:underline"
    onClick={switchToSignup}
  >
    Sign Up
  </button>
</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
