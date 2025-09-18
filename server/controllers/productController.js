const Product = require("../models/Product");
const fs =require("fs");
const path = require("path");
// 🔹 Create a new product (directly posted)
// 🔹 Create a new product
const createProduct = async (req, res) => {
  try {
    const imagePaths = req.files
      ? req.files.map(
          (file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`
        )
      : [];
      let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (err) {
        console.error("❌ Error parsing variants JSON:", err);
      }
    }

    // 🟢 Normalize category to lowercase-with-dashes
    let normalizedCategory = [];
    if (Array.isArray(req.body.category)) {
      normalizedCategory = req.body.category.map((c) =>
        c.toLowerCase().trim().replace(/\s+/g, "-")
      );
    } else if (typeof req.body.category === "string") {
      normalizedCategory = [
        req.body.category.toLowerCase().trim().replace(/\s+/g, "-"),
      ];
    }

    const product = await Product.create({
      ...req.body,
      category: normalizedCategory,
      seller: req.user._id,
      images: imagePaths,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
};


// 🔹 Get all products (public)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email"); // optional: show seller info
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// 🔹 Get products of the logged-in seller
const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching seller products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// 🔹 Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("❌ Error fetching product by ID:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// 🔹 Update a product (only by seller)
// 🔹 Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, seller: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const imagePaths = req.files
      ? req.files.map(file => `${req.protocol}://${req.get("host")}/images/${file.filename}`)
      : [];
      // Parse variants if present
    let variants = product.variants; // fallback to existing
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (err) {
        console.error("❌ Error parsing variants JSON:", err);
      }
    }

    Object.assign(product, req.body);
    if (imagePaths.length) product.images = imagePaths;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};


// 🔹 Delete a product (only by seller)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, seller: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 🗑 Delete image files from /public/images
    if (product.images && product.images.length > 0) {
      product.images.forEach(imgUrl => {
        const filename = imgUrl.split("/images/")[1]; // extract "172345123-shirt.jpg"
        if (!filename) return;

        const imagePath = path.join(__dirname, "..", "public", "images", filename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// 🔹 Get products by category (public)
const getProductsByCategory = async (req, res) => {
  try {
    const categories = req.params.category.includes(",")
      ? req.params.category.split(",").map(c => c.trim())
      : [req.params.category];
    const products = await Product.find({ category: { $in: categories } });
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products by category:", err);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

// 🔹 Get all unique categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
// 🔍 Search products by name or tags
// 🔍 Search products by name, tags, category, brand, price, sort
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i"); // case-insensitive
      filter.$or = [
        { name: regex },
        { tags: regex } // simple array match
      ];
    }

    console.log("Filter:", JSON.stringify(filter, null, 2)); // debug

    const products = await Product.find(filter).populate("seller", "name email");

    res.json({
      products,
      total: products.length,
    });
  } catch (err) {
    console.error("❌ Error searching products:", err);
    res.status(500).json({ message: "Failed to search products" });
  }
};










module.exports = {
  createProduct,
  getProducts,
  getSellerProducts, // new
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getCategories,
  searchProducts

};
