const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
    },

    isApprovedSeller: {
      type: Boolean,
      default: false, // admin will set this to true when approving
    },

    shopName: {
      type: String,
      required: function () {
        return this.role === 'seller';
      },
    },

    shopDescription: {
      type: String,
    },

    shopLogo: {
      type: String, // URL of uploaded logo
    },

    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
