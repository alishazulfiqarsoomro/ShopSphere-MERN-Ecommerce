
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/orderService";

function Checkout() {
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================================
  // SET USER INFORMATION
  // ========================================

  useEffect(() => {
    if (user) {
      setFormData((previous) => ({
        ...previous,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error when user starts typing
    if (error) {
      setError("");
    }
  };

  // ========================================
  // VALIDATE FORM
  // ========================================

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const address = formData.address.trim();
    const city = formData.city.trim();

    if (!name) {
      return "Please enter your full name.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    if (!phone) {
      return "Please enter your phone number.";
    }

    if (!address) {
      return "Please enter your delivery address.";
    }

    if (!city) {
      return "Please enter your city.";
    }

    if (cartItems.length === 0) {
      return "Your cart is empty.";
    }

    return "";
  };

  // ========================================
  // PLACE ORDER
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    // Validate
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // ========================================
      // PREPARE ORDER
      // ========================================

      const orderData = {
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
        },

        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),

        paymentMethod: formData.paymentMethod,
      };

      console.log("Sending Order:", orderData);

      // ========================================
      // CREATE ORDER
      // ========================================

      const response = await createOrder(orderData);

      console.log("Order Response:", response);

      // ========================================
      // SUCCESS
      // ========================================

      if (response?.success && response?.order) {
        const createdOrder = response.order;

        // Clear cart after successful order
        clearCart();

        // Redirect to success page
        navigate("/order-success", {
          replace: true,
          state: {
            order: createdOrder,
          },
        });

        return;
      }

      // ========================================
      // API ERROR
      // ========================================

      setError(
        response?.message ||
          "Unable to place order. Please try again."
      );
    } catch (error) {
      console.error("Order Error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // EMPTY CART
  // ========================================

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">

          <div className="empty-checkout">

            <div className="empty-cart-icon">
              🛍
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some products before proceeding
              to checkout.
            </p>

            <Link
              to="/shop"
              className="primary-btn"
            >
              Continue Shopping
              <span>→</span>
            </Link>

          </div>

        </div>
      </main>
    );
  }

  // ========================================
  // CHECKOUT PAGE
  // ========================================

  return (
    <main className="checkout-page">

      <div className="container">

        {/* ================= HEADER ================= */}

        <div className="checkout-heading">

          <p className="section-label">
            SECURE CHECKOUT
          </p>

          <h1>
            Complete Your
            <span> Order</span>
          </h1>

          <p>
            Enter your delivery details and choose
            your preferred payment method.
          </p>

        </div>

        <div className="checkout-layout">

          {/* ================= FORM ================= */}

          <div className="checkout-form-card">

            <h2>
              Delivery Information
            </h2>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>

              {/* PHONE */}

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  autoComplete="tel"
                  required
                />

              </div>

              {/* ADDRESS */}

              <div className="form-group">

                <label htmlFor="address">
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  rows="4"
                  autoComplete="street-address"
                  required
                />

              </div>

              {/* CITY */}

              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                  required
                />

              </div>

              {/* PAYMENT */}

              <div className="form-group">

                <label htmlFor="paymentMethod">
                  Payment Method
                </label>

                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >

                  <option value="Cash on Delivery">
                    Cash on Delivery
                  </option>

                  <option value="EasyPaisa">
                    EasyPaisa
                  </option>

                  <option value="JazzCash">
                    JazzCash
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                </select>

              </div>

              {/* ERROR */}

              {error && (
                <div
                  className="checkout-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="checkout-submit"
                disabled={loading}
              >

                {loading
                  ? "Placing Order..."
                  : "Place Order"}

                {!loading && (
                  <span>→</span>
                )}

              </button>

            </form>

          </div>

          {/* ================= SUMMARY ================= */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {/* PRODUCTS */}

            <div className="checkout-products">

              {cartItems.map((item) => (

                <div
                  className="checkout-product"
                  key={item._id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

            </div>

            <div className="summary-divider"></div>

            {/* SUBTOTAL */}

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ${Number(cartTotal).toFixed(2)}
              </strong>

            </div>

            {/* SHIPPING */}

            <div className="summary-row">

              <span>
                Shipping
              </span>

              <span className="free-shipping">
                Free
              </span>

            </div>

            <div className="summary-divider"></div>

            {/* TOTAL */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ${Number(cartTotal).toFixed(2)}
              </strong>

            </div>

            {/* BACK TO CART */}

            <Link
              to="/cart"
              className="continue-shopping"
            >
              ← Back to Cart
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Checkout;

