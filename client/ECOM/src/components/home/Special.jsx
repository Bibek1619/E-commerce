import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CartPopup from "../../components/box/CartPopup";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useUser } from "../providers/UserProvider";
const Special = () => {
  const [products, setProducts] = useState([]);
  const [popupProduct, setPopupProduct] = useState(null);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  // 🔁 Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products");
        let fetchedProducts = res.data;

        // Shuffle the array
        const shuffled = fetchedProducts
          .map((item) => ({ item, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ item }) => item);

        // Optional: limit how many to show (example: 8)
        setProducts(shuffled);
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
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)", fill: "currentColor" }}
        />,
      );
      stars.push(
        <Star
          key="half-empty"
          className="w-4 h-4 text-gray-300 absolute"
          style={{ clipPath: "inset(0 0 0 50%)", fill: "currentColor" }}
        />,
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return <div className="flex relative gap-0.5">{stars}</div>;
  };

  return (
    <div className="p-4">
      {/* Section heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Products You May Like
      </h2>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                className="h-28 sm:h-36 md:h-40 w-full object-cover rounded"
              />

              {/* Wishlist */}
              <button
                type="button"
                title="Add to wishlist"
                className="absolute top-1 right-8 bg-white p-1 rounded-full shadow hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Wishlist clicked");
                }}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500" />
              </button>

              {/* Cart */}
              <button
                type="button"
                title="Add to cart"
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-green-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCartClick(product);
                }}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-green-600" />
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-semibold mt-2 line-clamp-2">
              {product.name}
            </h3>

            <div className="mt-1">
              {product.discountedPrice &&
              product.discountedPrice < product.price ? (
                <div>
                  <span className="text-orange-600 font-bold text-sm sm:text-lg">
                    Rs. {product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 line-through ml-1 text-xs sm:text-sm">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-orange-600 font-bold text-sm sm:text-lg">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 mt-1">
              {renderStars(product.ratings || 0)}
              <span className="text-xs sm:text-sm text-gray-600">
                ({product.reviews?.length || 0})
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cart popup */}
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
