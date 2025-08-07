const User = require("../models/User");
const Product = require("../models/Product"); // 👈 Register Product model for populate


// 🔧 Helper: Format populated cart
const formatCart = (cart) => {
  return cart
    .filter((item) => item.productId) // ✅ Only keep valid items
    .map((item) => ({
      id: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.image,
      seller: item.productId.seller,
    }));
};


// 🔹 GET cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    res.json(formatCart(user.cart));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// 🔹 ADD to cart
// 🔹 ADD to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    await user.populate("cart.productId");

    res.json(formatCart(user.cart));
  } catch (err) {
    console.error("❌ Error in addToCart:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};


// 🔹 UPDATE quantity
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await user.save();

    await user.populate("cart.productId");
    res.json(formatCart(user.cart));
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart item" });
  }
};

// 🔹 REMOVE from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    await user.populate("cart.productId");

    // ✅ Return updated cart only (or success message, not both)
    res.json(formatCart(user.cart));
  } catch (err) {
    console.error("❌ Error in removeFromCart:", err);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
