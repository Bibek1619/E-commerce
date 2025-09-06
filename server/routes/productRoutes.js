const express = require("express");
const {
  createProduct,
  getProducts,
  getSellerProducts, // import it here
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getCategories
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

// 📌 Public Routes
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/categories", getCategories);

// 📌 Protected Routes
router.post("/", protect, upload.array("images", 5), createProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, deleteProduct);

// 📌 Seller Route (must be before "/:id")
router.get("/my-products", protect, getSellerProducts); 

// 📌 Product by ID (should be last)
router.get("/:id", getProductById);

module.exports = router;
