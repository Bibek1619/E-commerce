import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { X } from "lucide-react";
import { API_PATHS } from "@/utils/apiPaths";
import toast from "react-hot-toast";

const ReviewModal = ({ productId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please select a rating");

    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.REVIEW.ADD, {
        productId,
        rating,
        comment,
      });
      toast.success("Review submitted successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Give your review
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please give a star rating and write your comment about the product.
        </p>

        {/* Star rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 resize-none mb-4"
          rows={4}
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-500 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
