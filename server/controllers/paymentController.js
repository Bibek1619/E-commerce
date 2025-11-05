const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { items, customerEmail, userId, address } = req.body; // pass userId & address from frontend

  try {
    // 1️⃣ Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100), // in cents
        },
        quantity: item.quantity,
      })),
      customer_email: customerEmail,
      success_url: `http://localhost:5173/order-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: 'http://localhost:3000/cancel',
    });
    const sellerId = items[0]?.seller || items[0]?.product?.seller;
if (!sellerId) {
  return res.status(400).json({ message: "Seller ID missing in Stripe items" });
}
    // 2️⃣ Save order in MongoDB with status "pending"
    const order = await Order.create({
      user: userId,
      seller: sellerId, // ✅ include seller
      items: items.map(item => ({
        product: item.product, // product ID from frontend
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      address,
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      paymentMethod: 'stripe',
      status: 'pending',
      stripeSessionId: session.id, // link order to Stripe session
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getOrderBySessionId = async (req, res) => {
  try {
    const order = await Order.findOne({ stripeSessionId: req.params.sessionId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.verifyStripePayment = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // 1️⃣ Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Stripe session not found" });
    }

    // 2️⃣ Check payment status
    if (session.payment_status === "paid") {
      // 3️⃣ Update order in database
      const order = await Order.findOneAndUpdate(
        { stripeSessionId: sessionId },
        { status: "paid" },
        { new: true }
      ).populate("seller user");

      if (!order) {
        return res.status(404).json({ message: "Order not found for this session" });
      }

      return res.json({ success: true, order });
    } else {
      return res.status(400).json({ message: "Payment not completed yet" });
    }
  } catch (err) {
    console.error("Error verifying Stripe payment:", err);
    res.status(500).json({ message: err.message });
  }
};
