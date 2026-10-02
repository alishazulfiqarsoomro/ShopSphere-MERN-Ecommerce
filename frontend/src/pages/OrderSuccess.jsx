
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <main className="order-success-page">
      <div className="container">

        <div className="order-success-card">

          {/* SUCCESS ICON */}
          <div className="success-icon">
            ✓
          </div>

          {/* TITLE */}
          <p className="section-label">
            ORDER CONFIRMED
          </p>

          <h1>
            Order Placed
            <span> Successfully!</span>
          </h1>

          <p className="success-description">
            Thank you for shopping with ShopSphere.
            Your order has been received and is now
            being processed.
          </p>

          {/* ORDER INFORMATION */}
          {order && (
            <div className="success-order-info">

              {/* ORDER ID */}
              <div className="success-info-box">
                <span>
                  Order ID
                </span>

                <strong>
                  #{order._id?.slice(-8).toUpperCase()}
                </strong>
              </div>

              {/* TOTAL */}
              <div className="success-info-box">
                <span>
                  Total Amount
                </span>

                <strong>
                  ${Number(order.totalAmount).toFixed(2)}
                </strong>
              </div>

              {/* STATUS */}
              <div className="success-info-box">
                <span>
                  Order Status
                </span>

                <strong className="order-status">
                  {order.status || "Pending"}
                </strong>
              </div>

              {/* PAYMENT */}
              <div className="success-info-box">
                <span>
                  Payment Method
                </span>

                <strong>
                  {order.paymentMethod}
                </strong>
              </div>

            </div>
          )}

          {/* MESSAGE */}
          <div className="success-note">

            <span>📦</span>

            <p>
              Your order is currently being processed.
              We will keep you updated about your
              delivery status.
            </p>

          </div>

          {/* BUTTONS */}
          <div className="success-actions">

            <Link
              to="/shop"
              className="primary-btn"
            >
              Continue Shopping
              <span>→</span>
            </Link>

            <Link
              to="/"
              className="secondary-btn"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}

export default OrderSuccess;

