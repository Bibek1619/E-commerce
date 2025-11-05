import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, User, Mail, LockKeyhole,
  CheckCircle, AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { useSignup } from "@/components/providers/SignupProvider";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/components/providers/userProvider";
import { FaGoogle } from "react-icons/fa";


const SignUp = ({ switchToLogin }) => {
  const navigate = useNavigate();
  const { signupData: formData, setSignupData: setFormData } = useSignup();
  const { updateUser } = useContext(UserContext);

  // ✅ Ensure default values
  const safeFormData = {
    name: formData?.name || "",
    email: formData?.email || "",
    password: formData?.password || "",
    confirmPassword: formData?.confirmPassword || "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength < 2) return "bg-red-500";
    if (strength < 3) return "bg-yellow-500";
    if (strength < 4) return "bg-orange-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength < 2) return "Weak";
    if (strength < 3) return "Fair";
    if (strength < 4) return "Good";
    return "Strong";
  };

  // Validation
  const validate = () => {
    const newErrors = { email: "", name: "", password: "", confirmPassword: "" };

    if (!safeFormData.name.trim()) newErrors.name = "Name is required";
    if (!safeFormData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(safeFormData.email))
      newErrors.email = "Invalid email format";

    if (!safeFormData.password) newErrors.password = "Password is required";
    else if (safeFormData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (safeFormData.password !== safeFormData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!acceptedTerms) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: safeFormData.name,
        email: safeFormData.email,
        password: safeFormData.password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.success("Google Sign In coming soon!");
  };

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const passwordStrength = getPasswordStrength(safeFormData.password);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-8 px-4"
    >
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="text-center pb-6 pt-8 px-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Join us to explore authentic Nepali treasures
          </p>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  value={safeFormData.name}
                  onChange={handleChange("name")}
                  placeholder="Enter your full name"
                  className={`pl-10 h-12 bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-2 text-gray-900 focus:ring-orange-200 ${
                    errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
                  }`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={safeFormData.email}
                  onChange={handleChange("email")}
                  placeholder="Enter your email"
                  className={`pl-10 h-12 bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={safeFormData.password}
                  onChange={handleChange("password")}
                  placeholder="Create a strong password"
                  className={`pl-10 pr-12 h-12 bg-gray-50 text-gray-900 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                    errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-900"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </div>
              )}
              {safeFormData.password && !errors.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Password Strength:</span>
                    <Badge className={`${getStrengthColor(passwordStrength)} text-white`}>
                      {getStrengthText(passwordStrength)}
                    </Badge>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i < passwordStrength ? getStrengthColor(passwordStrength) : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={safeFormData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  placeholder="Confirm your password"
                  className={`pl-10 pr-12 h-12 bg-gray-50 text-gray-900  border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                    errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </div>
              )}
              {safeFormData.confirmPassword &&
                !errors.confirmPassword &&
                safeFormData.password === safeFormData.confirmPassword && (
                  <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                    <CheckCircle className="h-3 w-3" />
                    Passwords match
                  </div>
                )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={() => setAcceptedTerms((prev) => !prev)}
                className="mt-0.5 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-1">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-orange-600 underline"
                  onClick={() => window.open("/terms", "_blank")}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-orange-600 underline"
                  onClick={() => window.open("/privacy", "_blank")}
                >
                  Privacy Policy
                </button>
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold"
              disabled={isLoading || !acceptedTerms}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Sign In at bottom ✅ */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-3 text-gray-700"
            onClick={handleGoogleSignIn}
          >
          <FaGoogle className="h-5 w-5" />
  Continue with Google
          </Button>

          {/* Switch */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-orange-600 font-semibold"
                onClick={switchToLogin}
              >
                Log In
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUp;
