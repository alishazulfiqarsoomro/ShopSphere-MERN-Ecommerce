
const express = require("express");

const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelMyOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ========================================
// CREATE ORDER
// USER + ADMIN
// ========================================

router.post(
  "/",
  authMiddleware,
  createOrder
);

// ========================================
// MY ORDERS
// USER + ADMIN
// ========================================

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

// ========================================
// ALL ORDERS
// ADMIN ONLY
// ========================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getOrders
);

// ========================================
// SINGLE ORDER
// USER + ADMIN
// ========================================

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

// ========================================
// CANCEL MY ORDER
// USER ONLY
// ========================================

router.put(
  "/:id/cancel",
  authMiddleware,
  cancelMyOrder
);

// ========================================
// UPDATE ORDER STATUS
// ADMIN ONLY
// ========================================

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;

