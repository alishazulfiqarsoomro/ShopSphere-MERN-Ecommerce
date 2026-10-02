
import { Routes, Route } from "react-router-dom";

// ========================================
// COMPONENTS
// ========================================

import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import About from "./components/About";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

// ========================================
// USER PAGES
// ========================================

import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

// ========================================
// ADMIN PAGES
// ========================================

import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";

// ========================================
// HOME PAGE
// ========================================

function Home() {
  return (
    <>
      <Navbar />

      {/* ========================================
          HERO SECTION
      ======================================== */}

      <main className="hero">
        <div className="container hero-content">

          {/* HERO TEXT */}

          <div className="hero-text">

            <p className="hero-label">
              CURATED FOR YOUR LIFESTYLE
            </p>

            <h1>
              Elevate Your
              <br />
              Everyday.
            </h1>

            <p className="hero-description">
              Discover thoughtfully selected products
              designed to make everyday living
              effortlessly better.
            </p>

            <div className="hero-buttons">

              <a
                href="/shop"
                className="primary-btn"
              >
                Shop Collection
                <span>→</span>
              </a>

              <a
                href="/categories"
                className="secondary-btn"
              >
                Explore Categories
              </a>

            </div>

          </div>

          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="hero-circle"></div>

            <div className="hero-card">

              <span>
                NEW COLLECTION
              </span>

              <h2>
                Timeless
                <br />
                Essentials
              </h2>

              <p>
                Discover the latest arrivals.
              </p>

            </div>

          </div>

        </div>
      </main>

      {/* HOME SECTIONS */}

      <Categories />
      <About />
      <FeaturedProducts />
      <WhyChooseUs />
      <Reviews />
      <Newsletter />
      <Footer />
    </>
  );
}

// ========================================
// APP
// ========================================

function App() {
  return (
    <Routes>

      {/* ========================================
          HOME
      ======================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* ========================================
          LOGIN
      ======================================== */}

      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <Login />
          </>
        }
      />

      {/* ========================================
          REGISTER
      ======================================== */}

      <Route
        path="/register"
        element={
          <>
            <Navbar />
            <Register />
          </>
        }
      />

      {/* ========================================
          SHOP
      ======================================== */}

      <Route
        path="/shop"
        element={
          <>
            <Navbar />
            <Shop />
            <Footer />
          </>
        }
      />

      {/* ========================================
          CATEGORIES
      ======================================== */}

      <Route
        path="/categories"
        element={
          <>
            <Navbar />
            <CategoriesPage />
            <Footer />
          </>
        }
      />

      {/* ========================================
          ABOUT
      ======================================== */}

      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
        }
      />

      {/* ========================================
          CART
      ======================================== */}

      <Route
        path="/cart"
        element={
          <>
            <Navbar />
            <Cart />
            <Footer />
          </>
        }
      />

      {/* ========================================
          PRODUCT DETAILS
      ======================================== */}

      <Route
        path="/product/:id"
        element={
          <>
            <Navbar />
            <ProductDetails />
            <Footer />
          </>
        }
      />

      {/* ========================================
          CHECKOUT
      ======================================== */}

      <Route
        path="/checkout"
        element={
          <>
            <Navbar />
            <Checkout />
            <Footer />
          </>
        }
      />

      {/* ========================================
          ORDER SUCCESS
      ======================================== */}

      <Route
        path="/order-success"
        element={
          <>
            <Navbar />
            <OrderSuccess />
            <Footer />
          </>
        }
      />

      {/* ========================================
          MY ORDERS
      ======================================== */}

      <Route
        path="/my-orders"
        element={
          <>
            <Navbar />
            <MyOrders />
            <Footer />
          </>
        }
      />

      {/* ========================================
          ORDER DETAILS
      ======================================== */}

      <Route
        path="/my-orders/:id"
        element={
          <>
            <Navbar />
            <OrderDetails />
            <Footer />
          </>
        }
      />

      {/* ========================================
          PROTECTED ADMIN ROUTES
      ======================================== */}

      <Route element={<AdminRoute />}>

        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin"
          element={
            <>
              <Navbar />
              <AdminDashboard />
              <Footer />
            </>
          }
        />

        {/* ADMIN ORDERS */}

        <Route
          path="/admin/orders"
          element={
            <>
              <Navbar />
              <AdminOrders />
              <Footer />
            </>
          }
        />

        {/* ADMIN PRODUCTS */}

        <Route
          path="/admin/products"
          element={
            <>
              <Navbar />
              <AdminProducts />
              <Footer />
            </>
          }
        />

        {/* ADD PRODUCT */}

        <Route
          path="/admin/products/add"
          element={
            <>
              <Navbar />
              <AdminAddProduct />
              <Footer />
            </>
          }
        />

        {/* EDIT PRODUCT */}

        <Route
          path="/admin/products/edit/:id"
          element={
            <>
              <Navbar />
              <AdminEditProduct />
              <Footer />
            </>
          }
        />

      </Route>

    </Routes>
  );
}

export default App;

