import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // adjust path
import { API_PATHS } from "../../../utils/apiPaths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SellerLog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `${API_PATHS.AUTH.LOGIN}?role=seller`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success(res.data.message || "Login successful!");

      // Save token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Reset form
      setFormData({
        email: "",
        password: "",
      });

      // Navigate to seller dashboard
      navigate("/seller/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Seller Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login as Seller"}
        </button>
      </form>
    </div>
  );
};

export default SellerLog;
