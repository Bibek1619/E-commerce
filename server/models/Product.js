const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  price: Number,
  stock: { type: Number, default: 0 },
  sku: String
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },

    category: { type: [String], required: true },
    brand: String,

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    images: {
      type: [String],
      validate: arr => arr.length > 0
    },

    variants: [variantSchema], // optional size/color/sku/stock

    ratings: { type: Number, default: 0 },
    reviews: [reviewSchema],

    features: [String], // optional list: ["Durable","Lightweight",...]
    specifications: { type: Map, of: String },

    tags: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
