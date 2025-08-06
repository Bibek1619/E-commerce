const Product = require("../models/Product");

// 🔹 Create a product
const createProduct = async (req, res) => {
  try {
    const { name, price, image, seller } = req.body;
    const product = new Product({ name, price, image, seller });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// 🔹 Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// 🔹 Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// 🔹 Update product
const updateProduct = async (req, res) => {
  try {
    const { name, price, image, seller } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, seller },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// 🔹 Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
