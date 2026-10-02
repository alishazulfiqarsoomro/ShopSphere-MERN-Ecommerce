
const Order = require("../models/Order");
const Product = require("../models/Product");

// ========================================
// CREATE ORDER
// ========================================

const createOrder = async (req, res) => {
  try {
    const {
      customer,
      orderItems,
      paymentMethod,
    } = req.body;

    // ========================================
    // AUTH CHECK
    // ========================================

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // ========================================
    // CUSTOMER VALIDATION
    // ========================================

    if (
      !customer ||
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.city
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide complete customer information",
      });
    }

    // ========================================
    // ORDER ITEMS VALIDATION
    // ========================================

    if (
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Your order must contain at least one product",
      });
    }

    // ========================================
    // PAYMENT VALIDATION
    // ========================================

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a payment method",
      });
    }

    // ========================================
    // VERIFY PRODUCTS + STOCK
    // ========================================

    let totalAmount = 0;

    const verifiedItems = [];

    for (const item of orderItems) {
      // Find product from database
      const product = await Product.findById(
        item.product
      );

      // ========================================
      // PRODUCT NOT FOUND
      // ========================================

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            `Product not found: ${item.name}`,
        });
      }

      // ========================================
      // VALIDATE QUANTITY
      // ========================================

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Invalid quantity for ${product.name}`,
        });
      }

      // ========================================
      // OUT OF STOCK
      // ========================================

      if (product.stock <= 0) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} is out of stock.`,
        });
      }

      // ========================================
      // NOT ENOUGH STOCK
      // ========================================

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message:
            `Only ${product.stock} unit(s) of ${product.name} available.`,
        });
      }

      // ========================================
      // CALCULATE TOTAL
      // DATABASE PRICE IS USED
      // ========================================

      totalAmount +=
        product.price * quantity;

      // ========================================
      // VERIFIED ITEM
      // ========================================

      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      });
    }

    // ========================================
    // CREATE ORDER
    // ========================================

    const order = await Order.create({
      user: req.user._id,

      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
      },

      orderItems: verifiedItems,

      paymentMethod,

      totalAmount,

      status: "Pending",
    });

    // ========================================
    // REDUCE STOCK
    // ========================================

    for (const item of verifiedItems) {
      const updatedProduct =
        await Product.findOneAndUpdate(
          {
            _id: item.product,

            // Stock must still be enough
            stock: {
              $gte: item.quantity,
            },
          },

          {
            $inc: {
              stock: -item.quantity,
            },
          },

          {
            new: true,
          }
        );

      // ========================================
      // STOCK CHANGED BEFORE UPDATE
      // ========================================

      if (!updatedProduct) {
        // Remove created order
        await Order.findByIdAndDelete(
          order._id
        );

        return res.status(400).json({
          success: false,
          message:
            `Sorry, stock for ${item.name} is no longer available.`,
        });
      }
    }

    // ========================================
    // SUCCESS
    // ========================================

    res.status(201).json({
      success: true,
      message:
        "Order created successfully",
      order,
    });

  } catch (error) {
    console.error(
      "Create Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// GET ALL ORDERS
// ADMIN ONLY
// ========================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate(
        "user",
        "name email"
      )
      .populate(
        "orderItems.product"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error(
      "Get Orders Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// GET MY ORDERS
// ========================================

const getMyOrders = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });
    }

    const orders = await Order.find({
      user: req.user._id,
    })
      .populate(
        "orderItems.product"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error(
      "Get My Orders Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE ORDER
// USER + ADMIN
// ========================================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate(
        "user",
        "name email"
      )
      .populate(
        "orderItems.product"
      );

    // ========================================
    // ORDER NOT FOUND
    // ========================================

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ========================================
    // ADMIN CAN VIEW ANY ORDER
    // ========================================

    if (req.user.role === "admin") {
      return res.status(200).json({
        success: true,
        order,
      });
    }

    // ========================================
    // USER OWNERSHIP CHECK
    // ========================================

    const orderUserId =
      order.user?._id?.toString();

    const currentUserId =
      req.user._id?.toString();

    if (
      !orderUserId ||
      !currentUserId
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Unable to verify order ownership",
      });
    }

    // ========================================
    // USER CANNOT VIEW OTHER USER ORDER
    // ========================================

    if (
      orderUserId !== currentUserId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to view this order.",
      });
    }

    // ========================================
    // SUCCESS
    // ========================================

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(
      "Get Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE ORDER STATUS
// ADMIN ONLY
// ========================================

const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    // ========================================
    // ALLOWED STATUSES
    // ========================================

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order status",
      });
    }

    // ========================================
    // FIND ORDER
    // ========================================

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ========================================
    // PREVENT RE-CANCELLING
    // ========================================

    if (
      order.status === "Cancelled" &&
      status === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order is already cancelled.",
      });
    }

    // ========================================
    // PREVENT CHANGING CANCELLED ORDER
    // ========================================

    if (
      order.status === "Cancelled" &&
      status !== "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cancelled order cannot be changed.",
      });
    }

    // ========================================
    // CANCEL ORDER
    // RESTORE STOCK
    // ========================================

    if (
      status === "Cancelled" &&
      order.status !== "Cancelled"
    ) {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              stock: item.quantity,
            },
          }
        );
      }
    }

    // ========================================
    // UPDATE STATUS
    // ========================================

    order.status = status;

    await order.save();

    // ========================================
    // SUCCESS
    // ========================================

    res.status(200).json({
      success: true,
      message:
        "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.error(
      "Update Order Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// CANCEL MY ORDER
// USER ONLY
// ========================================

const cancelMyOrder = async (req, res) => {
  try {
    // ========================================
    // AUTH CHECK
    // ========================================

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // ========================================
    // FIND ORDER
    // ========================================

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ========================================
    // OWNERSHIP CHECK
    // ========================================

    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to cancel this order.",
      });
    }

    // ========================================
    // CHECK ORDER STATUS
    // ========================================

    const cancellableStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
    ];

    if (
      !cancellableStatuses.includes(order.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Order cannot be cancelled because its current status is ${order.status}.`,
      });
    }

    // ========================================
    // RESTORE PRODUCT STOCK
    // ========================================

    for (const item of order.orderItems) {
      if (item.product) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              stock: Number(item.quantity),
            },
          }
        );
      }
    }

    // ========================================
    // UPDATE ORDER STATUS
    // ========================================

    order.status = "Cancelled";

    await order.save();

    // ========================================
    // SUCCESS
    // ========================================

    return res.status(200).json({
      success: true,
      message:
        "Your order has been cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error(
      "Cancel My Order Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



// ========================================
// EXPORT FUNCTIONS
// ========================================


module.exports = {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelMyOrder,
};



