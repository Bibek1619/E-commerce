import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import Layout from "@/components/layout/Layout";
import { Heart, ShoppingCart, Star } from "lucide-react";
import CartPopup from "@/components/box/CartPopup";
import {useUser} from "@/components/providers/userProvider";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupProduct, setPopupProduct] = useState(null);
  const { user, loading: userLoading } = useUser();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/products/search?q=${encodeURIComponent(q)}`
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Search error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [q]);

  const handleAddToCartClick = (product) => {
    if (userLoading) return; // Wait for user loading
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
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
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

    return (
      <div className="flex relative gap-0.5" style={{ position: "relative" }}>
        {stars}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && <p>No products found.</p>}

        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-4 shadow hover:shadow-lg relative bg-white"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="relative">
              <img
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />

              {/* Wishlist */}
              <button
                type="button"
                title="Add to wishlist"
                className="absolute top-2 right-10 bg-white p-1 rounded-full shadow hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Wishlist clicked");
                }}
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>

              {/* Cart */}
              <button
                type="button"
                title="Add to cart"
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-green-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCartClick(product);
                }}
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-green-600" />
              </button>
            </div>

            <h3 className="text-lg font-semibold mt-3 line-clamp-2">
              {product.name}
            </h3>

            <div className="mt-1">
              {product.discountedPrice && product.discountedPrice < product.price ? (
                <div>
                  <span className="text-orange-600 font-bold text-lg">
                    Rs. {product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 line-through ml-2">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-orange-600 font-bold text-lg">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 mt-2">
              {renderStars(product.ratings || 0)}
              <span className="text-sm text-gray-600">
                ({product.reviews?.length || 0})
              </span>
            </div>
          </div>
        ))}

        {popupProduct && (
          <CartPopup product={popupProduct} onClose={() => setPopupProduct(null)} />
        )}
      </div>
    </Layout>
  );
}
