const mongoose = require("mongoose");
const Product = require("../models/Product");

// ========================================
// GET ALL PRODUCTS
// PUBLIC
// ========================================

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};

    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE PRODUCT
// PUBLIC
// ========================================

const getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// CREATE PRODUCT
// ADMIN ONLY
// ========================================

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
    } = req.body;

    // ========================================
    // VALIDATION
    // ========================================

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      price === "" ||
      !category?.trim() ||
      !image?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const productPrice = Number(price);
    const productStock = Number(stock ?? 0);

    if (Number.isNaN(productPrice) || productPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    if (
      Number.isNaN(productStock) ||
      productStock < 0 ||
      !Number.isInteger(productStock)
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid whole number",
      });
    }

    // ========================================
    // CREATE
    // ========================================

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: productPrice,
      category: category.trim(),
      image: image.trim(),
      stock: productStock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE PRODUCT
// ADMIN ONLY
// ========================================

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      category,
      image,
      stock,
    } = req.body;

    // ========================================
    // VALIDATION
    // ========================================

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      price === "" ||
      !category?.trim() ||
      !image?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const productPrice = Number(price);
    const productStock = Number(stock ?? 0);

    if (Number.isNaN(productPrice) || productPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    if (
      Number.isNaN(productStock) ||
      productStock < 0 ||
      !Number.isInteger(productStock)
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a valid whole number",
      });
    }

    // ========================================
    // UPDATE
    // ========================================

    product.name = name.trim();
    product.description = description.trim();
    product.price = productPrice;
    product.category = category.trim();
    product.image = image.trim();
    product.stock = productStock;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// DELETE PRODUCT
// ADMIN ONLY
// ========================================

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// EXPORT
// ========================================

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};