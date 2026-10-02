
const mongoose = require("mongoose");

// ========================================
// ORDER ITEM SCHEMA
// ========================================

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

// ========================================
// ORDER SCHEMA
// ========================================

const orderSchema = new mongoose.Schema(
  {
    // ========================================
    // USER
    // ========================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ========================================
    // CUSTOMER INFORMATION
    // ========================================

    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // ========================================
    // ORDER PRODUCTS
    // ========================================

    orderItems: {
      type: [orderItemSchema],

      required: true,

      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one product",
      },
    },

    // ========================================
    // PAYMENT METHOD
    // ========================================

    paymentMethod: {
      type: String,

      required: true,

      enum: [
        "Cash on Delivery",
        "EasyPaisa",
        "JazzCash",
        "Bank Transfer",
      ],
    },

    // ========================================
    // TOTAL PRICE
    // ========================================

    totalAmount: {
      type: Number,

      required: true,

      min: 0,
    },

    // ========================================
    // ORDER STATUS
    // ========================================

    status: {
      type: String,

      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],

      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

// ========================================
// EXPORT MODEL
// ========================================

module.exports = mongoose.model("Order", orderSchema);

