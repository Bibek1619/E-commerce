const express = require("express");
const {protect}=require("../middlewares/authMiddleware")
const { createOrder, getMyOrders, getOrderById } = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById); // optional, if you want order details page

module.exports = router;
