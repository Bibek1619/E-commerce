import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";
import { Mail, LockKeyhole } from "lucide-react";
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    };

    // Name check
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password check
    const password = formData.password;
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must include at least one uppercase letter";
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!acceptedTerms) {
      toast.error("You must accept the policy and terms");
      return;
    }

    toast.success("Registration successful");
    navigate("/auth/verification");
  };

  return (
    <div className="bg-[#E3E6E6] min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-md bg-white">
        <CardHeader className="text-center space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center mx-auto gap-0 text-3xl md:text-4xl font-extrabold text-orange-600"
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
              {/* Label with larger text */}
              <Label htmlFor="name">
                <span className="text-base font-medium">Full Name</span>
              </Label>

              {/* Input with icon on the left */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5 " />
               <Input
  id="name"
  type="text"
  value={formData.name}
  placeholder="Enter your full name"
  onChange={(e) =>
    setFormData((prev) => ({ ...prev, name: e.target.value }))
  }

  className="pl-10 border border-gray-300"
/>



              </div>

              {/* Error message */}
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-6 " />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="pl-10 border-gray-400 "
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-6 " />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="pl-10 border-gray-400 "
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <Input
                id="confirmPassword"
                placeholder="Re-enter your password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="border-gray-400 pl-10"
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
                className="cursor-pointer font-semibold"

                onCheckedChange={() => setAcceptedTerms((prev) => !prev)}
              />
              <div className="text-sm font-normal">
                By creating and/or using your account, you agree to our{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
