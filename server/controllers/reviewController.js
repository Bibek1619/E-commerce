const Product = require("../models/Product");
const Order = require("../models/Order");

exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if user bought & received this product
    const deliveredOrder = await Order.findOne({
      user: userId,
      "items.product": productId,
      status: "delivered",
    });

    if (!deliveredOrder)
      return res.status(403).json({ message: "You can only review delivered items" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Prevent duplicate review
    const already = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );
    if (already)
      return res.status(400).json({ message: "You already reviewed this product" });

    product.reviews.push({ user: userId, rating, comment });

    // Update average rating
    const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.ratings = total / product.reviews.length;

    await product.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate("reviews.user", "name email");
    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
