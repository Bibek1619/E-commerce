import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // adjust path to your axiosInstance
import { API_PATHS } from "../../../utils/apiPaths"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("confirmPassword", formData.confirmPassword);
      payload.append("shopName", formData.shopName);
      payload.append("shopDescription", formData.shopDescription);
      if (formData.shopPhoto) {
        payload.append("shopPhoto", formData.shopPhoto);
      }

      const res = await axiosInstance.post(
        `${API_PATHS.AUTH.REGISTER}?role=seller`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(res.data.message || "Seller registered successfully!");

      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        shopName: "",
        shopDescription: "",
        shopPhoto: null,
      });

      // navigate to seller dashboard
      navigate("/seller/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register as seller");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Seller Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="shopDescription"
          placeholder="Shop Description"
          value={formData.shopDescription}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="file"
          name="shopPhoto"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register as Seller"}
        </button>
      </form>
    </div>
  );
};

export default SellerReg;
