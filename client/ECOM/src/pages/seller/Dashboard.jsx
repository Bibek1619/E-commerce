import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch seller profile when dashboard loads
  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must log in first!");
          navigate("/seller/login");
          return;
        }

        const res = await axiosInstance.get(API_PATHS.SELLER.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSeller(res.data.seller);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load profile");
        navigate("/seller/login");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/seller/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Seller Info Card */}
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, {seller?.name}</h2>
        <p className="text-gray-600">Email: {seller?.email}</p>
        <p className="text-gray-600">Shop: {seller?.shopName}</p>
        <p className="text-gray-600">{seller?.shopDescription}</p>
        {seller?.shopPhoto && (
          <img
            src={seller.shopPhoto}
            alt="Shop"
            className="mt-4 w-40 h-40 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Dashboard Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold">34</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">Rs. 45,000</p>
        </div>
      </div>

      {/* Dashboard Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/seller/products")}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Manage Products
        </button>
        <button
          onClick={() => navigate("/seller/orders")}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default SellerDashboard;
