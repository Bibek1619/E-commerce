// CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import Layout from "@/components/layout/Layout";

const Category = () => {
  const { category } = useParams(); // e.g. "electronics"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          API_PATHS.PRODUCT.GET_BY_CATEGORY(category)
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return <p className="text-center py-6">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 py-6">{error}</p>;
  }

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">
        {category.replace("-", " ")}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="border p-2 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
  src={p.images?.[0]?.url || "/images/default-product.png"} // fallback image
  alt={p.name}
  className="h-40 w-full object-cover rounded"
/>

              <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
              <p className="text-gray-600">Rs. {p.discountedPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Category;
