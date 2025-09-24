const Order = require("../models/Order");

// Place order
exports.createOrder = async (req, res) => {
  try {
    const { items, address, paymentMethod, total } = req.body;

    // Make sure email exists
    if (!address.email && req.user.email) {
      address.email = req.user.email;
    }

    const order = new Order({
      user: req.user.id,
      items,
      address,
      paymentMethod,
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
};

// Get current user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Optional: Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};
