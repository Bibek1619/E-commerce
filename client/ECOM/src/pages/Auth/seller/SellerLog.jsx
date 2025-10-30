import React, { useState } from "react";
import { Eye, EyeOff, Store, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import toast from "react-hot-toast";
import { useUser } from "../../../components/providers/userProvider";

const SellerLog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { refreshUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `${API_PATHS.AUTH.LOGIN}?role=seller`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      await refreshUser();
      
      navigate("/seller/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 shadow-sm">
            <Store className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your seller account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 
                             transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 
                             transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 
                         rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-orange-700 
                         focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                         transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t">
            <p className="text-center text-gray-600">
              Don't have a seller account?{" "}
              <button
                onClick={() => navigate("/signup?role=seller")}
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <button onClick={() => navigate("/support")} className="text-orange-600 hover:underline">
              Contact Support
            </button>
          </p>
          <p className="text-sm text-gray-500">
            <button onClick={() => navigate("/")} className="text-orange-600 hover:underline">
              Back to Homepage
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerLog;
