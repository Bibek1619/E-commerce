const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getCategories
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multers");

const router = express.Router();

// 📌 Public Routes
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// 📌 Protected Routes
router.post("/", protect, upload.array("images", 5), createProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
