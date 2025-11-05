import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CartPopup from "../../components/box/CartPopup";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useUser } from "../providers/userProvider";

const Recommend = () => {
  const [products, setProducts] = useState([]);
  const [popupProduct, setPopupProduct] = useState(null);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products");
        setProducts(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCartClick = (product) => {
    if (loading) return;
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    setPopupProduct(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)", fill: "currentColor" }}
        />
      );
      stars.push(
        <Star
          key="half-empty"
          className="w-4 h-4 text-gray-300 absolute"
          style={{ clipPath: "inset(0 0 0 50%)", fill: "currentColor" }}
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return <div className="flex relative gap-0.5">{stars}</div>;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Recommended Products
      </h2>

      {/* Grid: 3 per row even on mobile */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-2 shadow hover:shadow-lg relative bg-white cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="relative">
              <img
                src={product.images?.[0] || product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-24 w-full object-cover rounded"
              />

              <button
                type="button"
                title="Add to wishlist"
                className="absolute top-1 right-8 bg-white p-1 rounded-full shadow hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Wishlist clicked");
                }}
              >
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>

              <button
                type="button"
                title="Add to cart"
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-green-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCartClick(product);
                }}
              >
                <ShoppingCart className="w-4 h-4 text-gray-600 hover:text-green-600" />
              </button>
            </div>

            <h3 className="text-sm font-semibold mt-2 line-clamp-2">
              {product.name}
            </h3>

            <div className="mt-1">
              {product.discountedPrice && product.discountedPrice < product.price ? (
                <div>
                  <span className="text-orange-600 font-bold text-sm">
                    Rs. {product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 line-through ml-1 text-xs">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-orange-600 font-bold text-sm">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 mt-1">
              {renderStars(product.ratings || 0)}
              <span className="text-xs text-gray-600">
                ({product.reviews?.length || 0})
              </span>
            </div>
          </div>
        ))}
      </div>

      {popupProduct && (
        <CartPopup product={popupProduct} onClose={() => setPopupProduct(null)} />
      )}
    </div>
  );
};

export default Recommend;
