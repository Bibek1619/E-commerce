// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import Layout from "@/components/layout/Layout";
import CartPopup from "@/components/box/CartPopup";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/providers/userProvider";

const ITEMS_PER_PAGE = 8;

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [popupProduct, setPopupProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let res;
        if (category === "all") {
          res = await axiosInstance.get(API_PATHS.PRODUCT.GET_ALL);
        } else {
          res = await axiosInstance.get(
            API_PATHS.PRODUCT.GET_BY_CATEGORY(category)
          );
        }

        let fetched = res.data || [];
        if (category === "all") fetched = shuffleArray(fetched);
        setProducts(fetched);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCartClick = (product, e) => {
    e.stopPropagation();
    if (userLoading) return;
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
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <p className="text-center py-6">Loading products...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold capitalize mb-6 text-center">
          {category.replace("-", " ")}
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          <>
            {/* Product grid: 2 per row on mobile, 2 on sm, 4 on md */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-2 sm:p-3 bg-white shadow hover:shadow-lg transition relative cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="relative">
                    <img
                      src={product.images?.[0] || product.image || "/images/default-product.png"}
                      alt={product.name}
                      className="h-28 sm:h-36 md:h-40 w-full object-cover rounded"
                    />

                    {/* Wishlist */}
                    <button
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
                      className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-green-100"
                      onClick={(e) => handleAddToCartClick(product, e)}
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-green-600" />
                    </button>
                  </div>

                  <h2 className="text-sm sm:text-base font-semibold mt-2 line-clamp-2">
                    {product.name}
                  </h2>

                  <div className="mt-1">
                    {product.discountedPrice && product.discountedPrice < product.price ? (
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

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={index + 1 === currentPage ? "default" : "outline"}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Cart Popup */}
      {popupProduct && (
        <CartPopup product={popupProduct} onClose={() => setPopupProduct(null)} />
      )}
    </Layout>
  );
};

export default Category;
