
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="container">

        {/* HEADER */}
        <div className="cart-heading">
          <p className="section-label">
            YOUR SHOPPING BAG
          </p>

          <h1>
            Shopping <span>Cart</span>
          </h1>

          <p>
            Review your selected products before checkout.
          </p>
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛍
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/shop"
              className="primary-btn"
            >
              Continue Shopping
              <span>→</span>
            </Link>

          </div>
        ) : (

          <div className="cart-layout">

            {/* CART ITEMS */}
            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item._id}
                >

                  {/* IMAGE */}
                  <Link
                    to={`/product/${item._id}`}
                    className="cart-item-image"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </Link>

                  {/* INFO */}
                  <div className="cart-item-info">

                    <p className="product-category">
                      {item.category}
                    </p>

                    <Link
                      to={`/product/${item._id}`}
                      className="cart-product-link"
                    >
                      <h3>
                        {item.name}
                      </h3>
                    </Link>

                    <strong className="cart-item-price">
                      ${Number(item.price).toFixed(2)}
                    </strong>

                    {/* QUANTITY */}
                    <div className="quantity-control">

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}
                  <div className="cart-item-right">

                    <strong>
                      $
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

              {/* CLEAR CART */}
              <button
                type="button"
                className="clear-cart"
                onClick={clearCart}
              >
                Clear Cart
              </button>

            </div>

            {/* ORDER SUMMARY */}
            <aside className="cart-summary">

              <h2>
                Order Summary
              </h2>

              {/* ITEMS */}
              <div className="summary-row">

                <span>
                  Items
                </span>

                <span>
                  {totalItems}
                </span>

              </div>

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

              {/* CHECKOUT */}
              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Proceed to Checkout
                <span>→</span>
              </Link>

              {/* CONTINUE SHOPPING */}
              <Link
                to="/shop"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;

