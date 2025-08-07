const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory, 

} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Public Routes
router.get("/", getProducts);                         // Get all products
router.get("/category/:category", getProductsByCategory); // Get by category
          // ✅ Get all unique categories
router.get("/:id", getProductById);                   // Get product by ID

// 📌 Protected Routes
router.post("/", protect, createProduct);             // Create product
router.put("/:id", protect, updateProduct);           // Update product
router.delete("/:id", protect, deleteProduct);        // Delete product

module.exports = router;
