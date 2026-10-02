
import api from "./api";

// ========================================
// GET ALL PRODUCTS
// ========================================

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// ========================================
// GET SINGLE PRODUCT
// ========================================

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// ========================================
// GET PRODUCTS BY CATEGORY
// ========================================

export const getProductsByCategory = async (category) => {
  const response = await api.get(
    `/products?category=${encodeURIComponent(category)}`
  );

  return response.data;
};

// ========================================
// CREATE PRODUCT - ADMIN
// ========================================

export const createProduct = async (productData) => {
  const response = await api.post(
    "/products",
    productData
  );

  return response.data;
};

// ========================================
// UPDATE PRODUCT - ADMIN
// ========================================

export const updateProduct = async (
  productId,
  productData
) => {
  const response = await api.put(
    `/products/${productId}`,
    productData
  );

  return response.data;
};

// ========================================
// DELETE PRODUCT - ADMIN
// ========================================

export const deleteProduct = async (productId) => {
  const response = await api.delete(
    `/products/${productId}`
  );

  return response.data;
};

