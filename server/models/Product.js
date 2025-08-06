const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  seller: String,
});

module.exports = mongoose.model("Product", productSchema);
