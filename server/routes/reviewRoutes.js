const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  addReview,
  getReviews
} = require("../controllers/reviewController");

router.post("/add", protect, addReview);
router.get("/:productId", getReviews);

module.exports = router;
