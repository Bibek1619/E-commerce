// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { createCheckoutSession, getOrderBySessionId,verifyStripePayment} = require("../controllers/paymentController");

router.post("/create-checkout-session", createCheckoutSession);
router.get("/get-order-by-session", getOrderBySessionId); // GET with query ?session_id=...
router.get("/verify/:sessionId", verifyStripePayment); // ✅ new route

module.exports = router;
