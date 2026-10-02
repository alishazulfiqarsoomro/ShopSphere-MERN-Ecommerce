
const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// REGISTER
// ========================================

router.post("/register", registerUser);

// ========================================
// LOGIN
// ========================================

router.post("/login", loginUser);

// ========================================
// LOGOUT
// ========================================

router.post("/logout", logoutUser);

// ========================================
// CURRENT LOGGED-IN USER
// ========================================

router.get("/me", protect, getCurrentUser);

// ========================================
// EXPORT
// ========================================

module.exports = router;

