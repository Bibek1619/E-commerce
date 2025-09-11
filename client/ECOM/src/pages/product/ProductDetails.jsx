// ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import Layout from "@/components/layout/Layout";

const ProductPage = () => {
  const { id } = useParams(); // product ID from route
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // for showing selected image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATHS.PRODUCT.GET_BY_ID(id));
        setProduct(res.data);
        setMainImage(res.data.images?.[0]?.url || "/images/default-product.png");
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Could not load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-6">Loading product...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;
  if (!product) return <p className="text-center py-6">Product not found.</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
        {/* Left: Images */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={mainImage}
            alt={product.name}
            className="h-80 w-80 object-cover rounded border"
          />
          <div className="flex gap-2 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Thumbnail ${idx}`}
                className={`h-20 w-20 object-cover rounded border cursor-pointer ${
                  mainImage === img.url ? "border-orange-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-orange-500">
            Rs. {product.discountedPrice}{" "}
            <span className="line-through text-gray-400 text-base">
              {product.price}
            </span>
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Seller:</strong> {product.seller?.name || "Unknown"}
          </p>
          <p>
            <strong>Ratings:</strong> {product.ratings || 0} ⭐
          </p>
          <p>
            <strong>Category:</strong> {product.category?.join(", ") || "-"}
          </p>
          <div className="flex gap-2">
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
