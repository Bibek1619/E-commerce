// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    address: {
      fullName: String,
      phone: String,
        email: String,
      street: String,
      city: String,
      postalCode: String,
    },
    paymentMethod: { type: String, enum: ["cod", "card", "esewa"], default: "cod" },
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
