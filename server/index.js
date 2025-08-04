// ✅ Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const cartRoutes = require("./routes/cartRoutes"); //

const app = express();

// CORS config
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define your routes here (if any)

app.use('/api/auth',authRoutes);
app.use('/api/cart', cartRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
