import React, { useState } from "react";
import { Store, Mail, Lock, User, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance"; // ✅ your axios config
import { API_PATHS } from "../../../utils/apiPaths"; // ✅ paths

const SellerReg = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    shopDescription: "",
    shopPhoto: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("shopName", formData.shopName);
      payload.append("shopDescription", formData.shopDescription);
      if (formData.shopPhoto) {
        payload.append("file", formData.shopPhoto); // ✅ backend expects `req.file`
      }

      const { data } = await axiosInstance.post(
        `${API_PATHS.AUTH.REGISTER}?role=seller`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("token", data.token);
      alert("Seller registered successfully!");
      navigate("/seller/dashboard");

    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to register as seller");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-400 rounded-full mb-3">
            <Store className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Seller Account</h1>
          <p className="text-gray-600 text-sm">Start your journey as a seller today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <textarea
            name="shopDescription"
            placeholder="Shop Description (optional)"
            value={formData.shopDescription}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 resize-none"
          />

          <input
            type="file"
            name="shopPhoto"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating Shop..." : "Register as Seller"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/signin?role=seller" className="text-amber-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerReg;
