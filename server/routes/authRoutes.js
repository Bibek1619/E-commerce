// authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // ✅ import multer from a separate file

// Routes
router.post('/register', upload.single("shopLogo"), registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
