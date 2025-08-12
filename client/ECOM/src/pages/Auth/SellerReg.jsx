import React, { useState } from "react";
import axios from "axios";

const ShopPhotoSelector = ({ image, setImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Shop Logo"
          className="w-28 h-28 object-cover rounded-md border mb-2"
        />
      ) : (
        <div className="w-28 h-28 flex items-center justify-center border-2 border-dashed rounded-md mb-2 text-gray-400">
          Shop Logo
        </div>
      )}

      <label className="cursor-pointer bg-amber-500 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-600">
        Upload Shop Logo
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

const SellerReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    shopDescription: "",
  });
  const [shopLogo, setShopLogo] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // For demo, we assume shopLogo is uploaded separately or as base64
      // Here we just simulate sending data including a dummy shopLogo URL
      
      // TODO: Upload shopLogo file to storage, get URL and send that
      const shopLogoUrl = shopLogo ? URL.createObjectURL(shopLogo) : "";

      const payload = {
        ...formData,
        role: "seller",
        shopLogo: shopLogoUrl,
      };

      const res = await axios.post("/api/users/register?role=seller", payload);

      setMessage(`✅ Registered as ${res.data.role}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Error"}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Registration</h2>

        {/* Shop Logo Upload at Top */}
        <ShopPhotoSelector image={shopLogo} setImage={setShopLogo} />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 w-full mb-3 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          className="border p-2 w-full mb-3 rounded"
          value={formData.shopName}
          onChange={handleChange}
          required
        />

        <textarea
          name="shopDescription"
          placeholder="Shop Description"
          className="border p-2 w-full mb-3 rounded"
          value={formData.shopDescription}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          Register as Seller
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SellerReg;
