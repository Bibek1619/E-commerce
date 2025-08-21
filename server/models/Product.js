const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discountedPrice: Number,
  stock: { type: Number, default: 0 },
  category: { type: [String], required: true }, // multiple categories
  brand: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to seller
  images: [String], // store multiple image URLs or file paths
  ratings: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
      rating: Number,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
