
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ========================================
// AUTHENTICATION MIDDLEWARE
// ========================================

const authMiddleware = async (req, res, next) => {
  try {
    // ========================================
    // GET TOKEN FROM COOKIE
    // ========================================

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    // ========================================
    // VERIFY TOKEN
    // ========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ========================================
    // FIND USER
    // ========================================

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // ========================================
    // SET CURRENT USER
    // ========================================

    req.user = user;

    console.log("Authenticated User:", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // ========================================
    // NEXT
    // ========================================

    next();

  } catch (error) {
    console.error(
      "Auth Middleware Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

module.exports = authMiddleware;

