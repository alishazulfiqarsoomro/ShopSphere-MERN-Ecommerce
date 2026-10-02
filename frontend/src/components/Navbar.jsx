
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const navigate = useNavigate();

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = async () => {
    await logout();

    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="container navbar-inner">

        {/* ========================================
            LOGO
        ======================================== */}

        <Link
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          <span className="logo-symbol">
            S
          </span>

          <span>
            ShopSphere
          </span>
        </Link>


        {/* ========================================
            DESKTOP / MOBILE MENU
        ======================================== */}

        <nav
          className={`nav-links ${
            menuOpen ? "show-menu" : ""
          }`}
        >

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>

          <Link
            to="/categories"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          {/* MY ORDERS */}
          {user && (
            <Link
              to="/my-orders"
              onClick={() => setMenuOpen(false)}
              className="my-orders-link"
            >
              My Orders
            </Link>
          )}

        </nav>


        {/* ========================================
            ACTIONS
        ======================================== */}

        <div className="nav-actions">

          {/* SEARCH */}

          <button
            className="nav-action"
            title="Search"
            type="button"
          >
            ⌕
          </button>


          {/* WISHLIST */}

          <button
            className="nav-action"
            title="Wishlist"
            type="button"
          >
            ♡
          </button>


          {/* CART */}

          <Link
            to="/cart"
            className="nav-action cart-action"
            title="Cart"
            onClick={() => setMenuOpen(false)}
          >
            🛍

            <span>
              {cartCount}
            </span>
          </Link>


          {/* ========================================
              AUTHENTICATION
          ======================================== */}

          {user ? (

            <div className="user-menu">

              {/* USER NAME */}

              <span className="user-name">
                Hi, {user.name}
              </span>


              {/* MY ORDERS - DESKTOP */}

              <Link
                to="/my-orders"
                className="orders-btn"
              >
                My Orders
              </Link>


              {/* LOGOUT */}

              <button
                className="logout-btn"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

          )}


          {/* ========================================
              MOBILE MENU BUTTON
          ======================================== */}

          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            type="button"
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;

