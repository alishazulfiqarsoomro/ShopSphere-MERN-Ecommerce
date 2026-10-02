
// ========================================
// ADMIN MIDDLEWARE
// ========================================

const adminMiddleware = (req, res, next) => {
  // User login check
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Admin check
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  // Admin verified
  next();
};

module.exports = adminMiddleware;

