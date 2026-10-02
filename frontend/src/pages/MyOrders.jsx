
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyOrders();

        console.log("My Orders Response:", response);

        if (response?.success) {
          setOrders(response.orders || []);
        } else {
          setError(
            response?.message || "Unable to load your orders."
          );
        }
      } catch (error) {
        console.error("Get My Orders Error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load your orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  if (loading) {
    return (
      <main className="my-orders-page">
        <div className="container">
          <div className="orders-loading">
            <div className="orders-spinner"></div>

            <h2>Loading Your Orders...</h2>

            <p>
              Please wait while we fetch your order history.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-orders-page">
        <div className="container">
          <div className="orders-error">
            <div className="orders-error-icon">!</div>

            <h2>Unable to Load Orders</h2>

            <p>{error}</p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
              <span>→</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="my-orders-page">
        <div className="container">
          <div className="orders-heading">
            <p className="section-label">ORDER HISTORY</p>

            <h1>
              My <span>Orders</span>
            </h1>

            <p>
              Track and manage your ShopSphere orders.
            </p>
          </div>

          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <Link to="/shop" className="primary-btn">
              Start Shopping
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="my-orders-page">
      <div className="container">

        <div className="orders-heading">
          <p className="section-label">ORDER HISTORY</p>

          <h1>
            My <span>Orders</span>
          </h1>

          <p>
            Track and manage all your ShopSphere orders.
          </p>
        </div>

        <div className="orders-topbar">
          <div>
            <strong>{orders.length}</strong>

            <span>
              {orders.length === 1 ? " Order" : " Orders"}
            </span>
          </div>

          <Link
            to="/shop"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="orders-list">

          {orders.map((order) => (
            <div
              className="order-card"
              key={order._id}
            >

              {/* ORDER HEADER */}

              <div className="order-card-header">

                <div>
                  <p>ORDER ID</p>

                  <strong>
                    #
                    {order._id
                      ?.slice(-8)
                      .toUpperCase()}
                  </strong>
                </div>

                <div className="order-date">

                  <p>ORDER DATE</p>

                  <strong>
                    {formatDate(order.createdAt)}
                  </strong>

                </div>

                <span
                  className={`order-status-badge ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status || "Pending"}
                </span>

              </div>

              {/* PRODUCTS */}

              <div className="order-products">

                {order.orderItems?.map((item, index) => (
                  <div
                    className="order-product"
                    key={`${order._id}-${index}`}
                  >

                    <div className="order-product-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="order-product-info">

                      <h3>{item.name}</h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      <span>
                        ${Number(item.price).toFixed(2)}
                      </span>

                    </div>

                    <strong className="order-product-total">
                      $
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toFixed(2)}
                    </strong>

                  </div>
                ))}

              </div>

              {/* FOOTER */}

              <div className="order-card-footer">

                <div className="order-payment">
                  <span>Payment</span>

                  <strong>
                    {order.paymentMethod}
                  </strong>
                </div>

                <div className="order-total">
                  <span>Total</span>

                  <strong>
                    ${Number(order.totalAmount).toFixed(2)}
                  </strong>
                </div>

              </div>

              {/* VIEW DETAILS */}

              <div className="order-details-action">

                <Link
                  to={`/my-orders/${order._id}`}
                  className="view-order-btn"
                >
                  View Order Details
                  <span>→</span>
                </Link>

              </div>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}

export default MyOrders;

