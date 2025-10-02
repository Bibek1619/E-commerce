import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/components/providers/userProvider";

const Login = ({ onSuccess, switchToSignup }) => {
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

      if (onSuccess) {
        onSuccess();
      } else {
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
    <Card className="w-full max-w-md shadow-2xl border border-gray-200 rounded-2xl bg-white">
      <CardContent className="p-6">
        <h2 className="text-center text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            />
          </div>

          {/* Password */}
         <div>
  <Label htmlFor="password" className="text-gray-700">Password</Label>
  <div className="relative mt-1">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      }
      required
      className="pr-12 border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
    />
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  </div>
</div>


          {/* Submit */}
          <Button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md"
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
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-orange-500 font-medium hover:underline"
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
