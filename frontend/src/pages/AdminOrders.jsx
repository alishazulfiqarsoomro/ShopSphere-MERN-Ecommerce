
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getOrders,
  updateOrderStatus,
} from "../services/orderService";

function AdminOrders() {
  // ========================================
  // STATES
  // ========================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // ========================================
  // ORDER STATUSES
  // ========================================

  const statuses = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // ========================================
  // GET ALL ORDERS
  // ========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();

      console.log(
        "Admin Orders Response:",
        response
      );

      if (response?.success) {
        setOrders(response.orders || []);
      } else {
        setError(
          response?.message ||
            "Unable to load orders."
        );
      }
    } catch (error) {
      console.error(
        "Get Orders Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FETCH ORDERS ON PAGE LOAD
  // ========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ========================================
  // UPDATE ORDER STATUS
  // ========================================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    // ========================================
    // CANCEL CONFIRMATION
    // ========================================

    if (newStatus === "Cancelled") {
      const confirmCancel =
        window.confirm(
          "Are you sure you want to cancel this order?\n\nThe product stock will be restored."
        );

      if (!confirmCancel) {
        return;
      }
    }

    try {
      setUpdatingId(orderId);

      const response =
        await updateOrderStatus(
          orderId,
          newStatus
        );

      console.log(
        "Status Update Response:",
        response
      );

      if (response?.success) {
        setOrders((previousOrders) =>
          previousOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status:
                    response.order?.status ||
                    newStatus,
                }
              : order
          )
        );

        // ========================================
        // SUCCESS MESSAGE
        // ========================================

        if (newStatus === "Cancelled") {
          alert(
            "Order cancelled successfully ✅\nProduct stock has been restored."
          );
        }
      } else {
        alert(
          response?.message ||
            "Unable to update order status."
        );
      }
    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ========================================
  // STATUS CSS CLASS
  // ========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "admin-status-confirmed";

      case "Processing":
        return "admin-status-processing";

      case "Shipped":
        return "admin-status-shipped";

      case "Delivered":
        return "admin-status-delivered";

      case "Cancelled":
        return "admin-status-cancelled";

      default:
        return "admin-status-pending";
    }
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  // ========================================
  // FORMAT PRICE
  // ========================================

  const formatPrice = (price) => {
    return Number(price || 0).toFixed(2);
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="admin-orders-page">
        <div className="container">
          <div className="admin-orders-loading">
            <div className="admin-spinner"></div>

            <h2>
              Loading Orders...
            </h2>

            <p>
              Please wait while we fetch all
              customer orders.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <main className="admin-orders-page">
        <div className="container">
          <div className="admin-orders-error">
            <div className="admin-error-icon">
              !
            </div>

            <h2>
              Unable to Load Orders
            </h2>

            <p>{error}</p>

            <button
              type="button"
              className="admin-retry-btn"
              onClick={fetchOrders}
            >
              Try Again →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="admin-orders-page">
      <div className="container">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="admin-orders-heading">
          <div>
            <p className="section-label">
              ADMIN PANEL
            </p>

            <h1>
              Orders <span>Management</span>
            </h1>

            <p>
              View, manage and update all
              customer orders.
            </p>
          </div>

          {/* TOTAL ORDERS */}

          <div className="admin-order-count">
            <strong>
              {orders.length}
            </strong>

            <span>
              Total Orders
            </span>
          </div>
        </div>

        {/* ========================================
            EMPTY ORDERS
        ======================================== */}

        {orders.length === 0 ? (
          <div className="admin-empty-orders">

            <div className="admin-empty-icon">
              📦
            </div>

            <h2>
              No Orders Found
            </h2>

            <p>
              There are currently no customer
              orders.
            </p>

          </div>
        ) : (

          /* ========================================
             ORDERS LIST
          ======================================== */

          <div className="admin-orders-list">

            {orders.map((order) => (

              <div
                className="admin-order-card"
                key={order._id}
              >

                {/* ========================================
                    ORDER HEADER
                ======================================== */}

                <div className="admin-order-header">

                  {/* ORDER ID */}

                  <div>
                    <p>
                      ORDER ID
                    </p>

                    <strong>
                      #
                      {order._id
                        ?.slice(-8)
                        .toUpperCase()}
                    </strong>
                  </div>

                  {/* DATE */}

                  <div>
                    <p>
                      ORDER DATE
                    </p>

                    <strong>
                      {formatDate(
                        order.createdAt
                      )}
                    </strong>
                  </div>

                  {/* TOTAL */}

                  <div>
                    <p>
                      TOTAL
                    </p>

                    <strong className="admin-order-price">
                      $
                      {formatPrice(
                        order.totalAmount
                      )}
                    </strong>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`admin-status-badge ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status ||
                      "Pending"}
                  </span>

                </div>

                {/* ========================================
                    CUSTOMER INFORMATION
                ======================================== */}

                <div className="admin-customer-section">

                  <h3>
                    Customer Information
                  </h3>

                  <div className="admin-customer-grid">

                    {/* NAME */}

                    <div>
                      <span>
                        Name
                      </span>

                      <strong>
                        {order.customer?.name ||
                          "N/A"}
                      </strong>
                    </div>

                    {/* EMAIL */}

                    <div>
                      <span>
                        Email
                      </span>

                      <strong>
                        {order.customer?.email ||
                          "N/A"}
                      </strong>
                    </div>

                    {/* PHONE */}

                    <div>
                      <span>
                        Phone
                      </span>

                      <strong>
                        {order.customer?.phone ||
                          "N/A"}
                      </strong>
                    </div>

                    {/* CITY */}

                    <div>
                      <span>
                        City
                      </span>

                      <strong>
                        {order.customer?.city ||
                          "N/A"}
                      </strong>
                    </div>

                    {/* ADDRESS */}

                    <div className="admin-address">
                      <span>
                        Address
                      </span>

                      <strong>
                        {order.customer?.address ||
                          "N/A"}
                      </strong>
                    </div>

                  </div>
                </div>

                {/* ========================================
                    ORDERED PRODUCTS
                ======================================== */}

                <div className="admin-products-section">

                  <h3>
                    Ordered Products
                  </h3>

                  {order.orderItems?.length >
                  0 ? (
                    order.orderItems.map(
                      (item, index) => (

                        <div
                          className="admin-product-row"
                          key={`${order._id}-${index}`}
                        >

                          {/* IMAGE */}

                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              "Product"
                            }
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                          {/* INFO */}

                          <div className="admin-product-info">

                            <strong>
                              {item.name ||
                                "Unknown Product"}
                            </strong>

                            <span>
                              Quantity:{" "}
                              {item.quantity}
                            </span>

                          </div>

                          {/* PRICE */}

                          <div className="admin-product-price">

                            $
                            {formatPrice(
                              Number(
                                item.price
                              ) *
                                Number(
                                  item.quantity
                                )
                            )}

                          </div>

                        </div>

                      )
                    )
                  ) : (
                    <p>
                      No products found.
                    </p>
                  )}

                </div>

                {/* ========================================
                    ORDER FOOTER
                ======================================== */}

                <div className="admin-order-footer">

                  {/* PAYMENT */}

                  <div className="admin-payment">

                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {order.paymentMethod ||
                        "N/A"}
                    </strong>

                  </div>

                  {/* STATUS CONTROL */}

                  <div className="admin-status-control">

                    <label>
                      Update Status
                    </label>

                    <select
                      value={
                        order.status ||
                        "Pending"
                      }
                      disabled={
                        updatingId ===
                          order._id ||
                        order.status ===
                          "Cancelled"
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                    >

                      {statuses.map(
                        (status) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>

                        )
                      )}

                    </select>

                    {updatingId ===
                      order._id && (
                      <small>
                        Updating...
                      </small>
                    )}

                  </div>

                </div>

                {/* ========================================
                    VIEW DETAILS
                ======================================== */}

                <div className="admin-order-action">

                  <Link
                    to={`/my-orders/${order._id}`}
                    className="admin-view-order-btn"
                  >
                    View Order Details →
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default AdminOrders;

