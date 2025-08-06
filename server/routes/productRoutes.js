const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public routes for testing
router.get("/", getProducts); // Get all
router.get("/:id", getProductById); // Get by ID

// Protected routes
router.post("/", protect, createProduct); // Add product
router.put("/:id", protect, updateProduct); // Update
router.delete("/:id", protect, deleteProduct); // Delete

module.exports = router;
