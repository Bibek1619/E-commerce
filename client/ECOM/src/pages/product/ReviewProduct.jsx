import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { Star } from "lucide-react";

const ReviewProduct = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATHS.REVIEW.GET(productId));
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p className="text-center py-4">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-center py-4">No reviews yet.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-1">
              {/* Display stars */}
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className={i <= review.rating ? "text-amber-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-gray-700 font-medium">{review.user?.name || "Anonymous"}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewProduct;
