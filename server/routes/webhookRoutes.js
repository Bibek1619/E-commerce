// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../controllers/webhookController');
const bodyParser = require('body-parser');

// Stripe requires raw body for webhook verification
router.post('/stripe', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
