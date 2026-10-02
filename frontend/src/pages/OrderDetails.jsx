
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOrderById,
  cancelMyOrder,
} from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // FETCH ORDER
  // ========================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrderById(id);

        console.log(
          "Order Details Response:",
          response
        );

        if (
          response?.success &&
          response?.order
        ) {
          setOrder(response.order);
        } else {
          setError(
            response?.message ||
              "Unable to load order."
          );
        }
      } catch (error) {
        console.error(
          "Get Order Details Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load order."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  // ========================================
  // CAN CANCEL?
  // ========================================

  const canCancelOrder = [
    "Pending",
    "Confirmed",
    "Processing",
  ].includes(order?.status);

  // ========================================
  // CANCEL ORDER
  // ========================================

  const handleCancelOrder = async () => {
    if (!order || cancelling) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      setError("");
      setSuccess("");

      const response = await cancelMyOrder(
        order._id
      );

      console.log(
        "Cancel Order Response:",
        response
      );

      if (response?.success) {
        setOrder((currentOrder) => ({
          ...currentOrder,
          status: "Cancelled",
        }));

        setSuccess(
          "Your order has been cancelled successfully."
        );
      } else {
        setError(
          response?.message ||
            "Unable to cancel order."
        );
      }
    } catch (error) {
      console.error(
        "Cancel Order Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to cancel order. Please try again."
      );
    } finally {
      setCancelling(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="order-details-page">
        <div className="container">
          <div className="orders-loading">
            <div className="orders-spinner"></div>

            <h2>Loading Order...</h2>

            <p>
              Please wait while we load your
              order details.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error && !order) {
    return (
      <main className="order-details-page">
        <div className="container">
          <div className="orders-error">

            <div className="orders-error-icon">
              !
            </div>

            <h2>Order Not Found</h2>

            <p>{error}</p>

            <Link
              to="/my-orders"
              className="primary-btn"
            >
              ← Back to My Orders
            </Link>

          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <main className="order-details-page">
      <div className="container">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="order-details-heading">

          <Link
            to="/my-orders"
            className="back-to-orders"
          >
            ← Back to My Orders
          </Link>

          <p className="section-label">
            ORDER DETAILS
          </p>

          <h1>
            Order{" "}
            <span>
              #
              {order._id
                ?.slice(-8)
                .toUpperCase()}
            </span>
          </h1>

          <p>
            Placed on{" "}
            {formatDate(order.createdAt)}
          </p>

        </div>

        {/* ========================================
            SUCCESS MESSAGE
        ======================================== */}

        {success && (
          <div className="order-success-message">
            <span>✓</span>
            <p>{success}</p>
          </div>
        )}

        {/* ========================================
            ERROR MESSAGE
        ======================================== */}

        {error && (
          <div className="order-error-message">
            <span>!</span>
            <p>{error}</p>
          </div>
        )}

        {/* ========================================
            STATUS
        ======================================== */}

        <div className="order-details-status">

          <div>
            <span>Order Status</span>

            <strong
              className={`order-status-badge ${getStatusClass(
                order.status
              )}`}
            >
              {order.status || "Pending"}
            </strong>
          </div>

          <div>
            <span>Payment Method</span>

            <strong>
              {order.paymentMethod || "N/A"}
            </strong>
          </div>

          <div>
            <span>Total Amount</span>

            <strong>
              $
              {Number(
                order.totalAmount
              ).toFixed(2)}
            </strong>
          </div>

        </div>

        {/* ========================================
            CANCEL ORDER
        ======================================== */}

        {canCancelOrder && (
          <div className="order-cancel-section">

            <div>
              <h3>
                Need to cancel your order?
              </h3>

              <p>
                You can cancel this order
                before it is shipped.
              </p>
            </div>

            <button
              type="button"
              className="cancel-order-btn"
              onClick={handleCancelOrder}
              disabled={cancelling}
            >
              {cancelling
                ? "Cancelling..."
                : "Cancel Order"}
            </button>

          </div>
        )}

        {/* ========================================
            DELIVERY INFORMATION
        ======================================== */}

        <div className="order-details-card">

          <h2>
            Delivery Information
          </h2>

          <div className="order-details-customer">

            <div>
              <span>Name</span>

              <strong>
                {order.customer?.name ||
                  "N/A"}
              </strong>
            </div>

            <div>
              <span>Email</span>

              <strong>
                {order.customer?.email ||
                  "N/A"}
              </strong>
            </div>

            <div>
              <span>Phone</span>

              <strong>
                {order.customer?.phone ||
                  "N/A"}
              </strong>
            </div>

            <div>
              <span>City</span>

              <strong>
                {order.customer?.city ||
                  "N/A"}
              </strong>
            </div>

            <div className="order-details-address">
              <span>Address</span>

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

        <div className="order-details-card">

          <h2>
            Ordered Products
          </h2>

          <div className="order-details-products">

            {order.orderItems?.map(
              (item, index) => (
                <div
                  className="order-details-product"
                  key={`${order._id}-${index}`}
                >

                  <div className="order-details-product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="order-details-product-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                    <span>
                      Unit Price: $
                      {Number(
                        item.price
                      ).toFixed(2)}
                    </span>

                  </div>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>

                </div>
              )
            )}

          </div>

        </div>

        {/* ========================================
            ORDER SUMMARY
        ======================================== */}

        <div className="order-details-card order-details-summary">

          <h2>
            Order Summary
          </h2>

          <div className="order-summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              $
              {Number(
                order.totalAmount
              ).toFixed(2)}
            </strong>

          </div>

          <div className="order-summary-row">

            <span>
              Shipping
            </span>

            <strong>
              Free
            </strong>

          </div>

          <div className="order-summary-divider"></div>

          <div className="order-summary-total">

            <span>
              Total
            </span>

            <strong>
              $
              {Number(
                order.totalAmount
              ).toFixed(2)}
            </strong>

          </div>

        </div>

        {/* ========================================
            BOTTOM ACTIONS
        ======================================== */}

        <div className="order-details-actions">

          <Link
            to="/my-orders"
            className="secondary-btn"
          >
            ← My Orders
          </Link>

          <Link
            to="/shop"
            className="primary-btn"
          >
            Continue Shopping →
          </Link>

        </div>

      </div>
    </main>
  );
}

export default OrderDetails;

