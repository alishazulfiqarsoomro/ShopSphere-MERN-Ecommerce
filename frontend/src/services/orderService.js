
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// ========================================
// CREATE ORDER
// ========================================

export const createOrder = async (orderData) => {
  const response = await axios.post(
    API_URL,
    orderData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ========================================
// GET MY ORDERS
// ========================================

export const getMyOrders = async () => {
  const response = await axios.get(
    `${API_URL}/my-orders`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ========================================
// GET ALL ORDERS
// ADMIN ONLY
// ========================================

export const getOrders = async () => {
  const response = await axios.get(
    API_URL,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ========================================
// GET SINGLE ORDER
// ========================================

export const getOrderById = async (orderId) => {
  const response = await axios.get(
    `${API_URL}/${orderId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ========================================
// UPDATE ORDER STATUS
// ADMIN ONLY
// ========================================

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await axios.put(
    `${API_URL}/${orderId}/status`,
    {
      status,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ========================================
// CANCEL MY ORDER
// USER ONLY
// ========================================

export const cancelMyOrder = async (orderId) => {
  const response = await axios.put(
    `${API_URL}/${orderId}/cancel`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

