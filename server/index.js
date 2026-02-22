// ✅ Load environment variables FIRST

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ needed for static path
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// ✅ CORS config
import cors from "cors";

app.use(
  cors({
    origin: "https://e-commerce-1t7x.vercel.app",
    credentials: true,
  })
);


// ✅ Connect to MongoDB
connectDB();

// ✅ Parse JSON request body
app.use(express.json());

// ✅ Serve images BEFORE routes (good practice)
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


//payemnt
app.use('/api/payment', paymentRoutes);
app.use('/webhook', webhookRoutes);

app.use('/api/review' ,reviewRoutes);


// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
