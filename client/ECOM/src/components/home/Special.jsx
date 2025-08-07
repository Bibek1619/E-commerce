// pages/Special.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import CartPopup from "../../components/box/CartPopup"; // Adjust import path

const Special = () => {
  const [products, setProducts] = useState([]);
  const [popupProduct, setPopupProduct] = useState(null); // controls popup

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products"); // Adjust route if needed
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded p-4 shadow hover:shadow-lg">
          <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setPopupProduct(product)}
          >
            🛒 Add to Cart
          </button>
        </div>
      ))}

      {/* Cart Popup */}
      {popupProduct && (
        <CartPopup
          product={popupProduct}
          onClose={() => setPopupProduct(null)}
        />
      )}
    </div>
  );
};

export default Special;
