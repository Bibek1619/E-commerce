const express = require("express");
const {protect}=require("../middlewares/authMiddleware")
const { createOrder, getMyOrders, getOrderById,updateOrderStatus,getSellerOrders,cancelOrder} = require("../controllers/orderController");


const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/seller", protect, getSellerOrders);
router.get("/:id", protect, getOrderById); // optional, if you want order details page


router.put("/:id/status", protect, updateOrderStatus);
router.put("/cancel/:id", protect, cancelOrder);


module.exports = router;
