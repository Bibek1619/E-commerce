// controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product"); // ✅ Corrected

// Place order
exports.createOrder = async (req, res) => {
  try {
    const { items, address, paymentMethod, total } = req.body;

    // Ensure email is set
    if (!address.email && req.user.email) {
      address.email = req.user.email;
    }

    // Add seller info to each item
    const itemsWithSeller = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product).select("seller");
        if (!product) throw new Error(`Product not found: ${item.product}`);
        return { ...item, seller: product.seller };
      })
    );

    // Group items by seller
    const groupedBySeller = itemsWithSeller.reduce((acc, item) => {
      const sellerId = item.seller.toString();
      if (!acc[sellerId]) acc[sellerId] = [];
      acc[sellerId].push(item);
      return acc;
    }, {});

    const orders = [];

    // Create separate order for each seller
    for (const [sellerId, sellerItems] of Object.entries(groupedBySeller)) {
      const sellerTotal = sellerItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      const order = new Order({
        user: req.user._id,
        seller: sellerId,
        items: sellerItems,
        address,
        paymentMethod,
        total: sellerTotal,
      });

      await order.save();
      orders.push(order);
    }

    res.status(201).json({ message: "Orders created successfully", orders });
  } catch (err) {
    console.error("Order creation error:", err);
    res
      .status(500)
      .json({ message: "Order creation failed", error: err.message });
  }
};

// Get current user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: err.message });
  }
};

// Get seller orders
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch seller orders", error: err.message });
  }
};

// Accept order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status", error: err.message });
  }
};


// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }

    if (!["pending", "accepted"].includes(order.status)) {
      return res.status(400).json({ message: "Order cannot be cancelled now" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to cancel order", error: err.message });
  }
};
