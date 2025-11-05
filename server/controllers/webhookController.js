// controllers/webhookController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Mark the order as paid
      const order = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: 'paid' }, // update order status
        { new: true }
      );
      console.log('Order marked as paid:', order?._id);
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  }

  res.json({ received: true });
};
