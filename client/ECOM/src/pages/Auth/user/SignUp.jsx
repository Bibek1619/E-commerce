import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, LockKeyhole } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { useSignup } from "@/components/providers/SignupProvider";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/components/providers/userProvider";

const SignUp = ({switchToLogin}) => {
  const navigate = useNavigate();
  const { signupData: formData, setSignupData: setFormData } = useSignup();
  const { updateUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Validation
  const validate = () => {
    const newErrors = { email: "", name: "", password: "", confirmPassword: "" };

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  // ✅ Submit
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
        name: formData.name,
        email: formData.email,
        password: formData.password,
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

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-1 text-3xl md:text-4xl font-extrabold text-orange-600"
          >
            <img src="/images/nepal-01-1.svg" alt="logo" className="h-9 w-10" />
            NepaliBazar
          </Link>
          <CardTitle className="font-bold">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  placeholder="Enter your full name"
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 h-5 w-6" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="Enter your email"
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 h-5 w-6" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="Enter your password"
                  className="pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="Re-enter your password"
                className="pl-10"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={() => setAcceptedTerms((prev) => !prev)}
                className="cursor-pointer"
              />
              <p className="text-sm">
                By creating and/or using your account, you agree to our{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

         <p className="mt-6 text-center text-sm">
  Already have an account?{" "}
  <button
    type="button"
    className="text-blue-600 hover:underline"
    onClick={switchToLogin}
  >
    Log In
  </button>
</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
