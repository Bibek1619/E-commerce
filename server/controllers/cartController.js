const User = require("../models/User");

// 🔹 GET cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// 🔹 ADD to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
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

    res.json({ cart: user.cart });
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
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
