
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

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

      <main className="hero">
        <div className="container hero-content">
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
              <a href="/shop" className="primary-btn">
                Shop Collection
                <span>→</span>
              </a>

              <a href="/categories" className="secondary-btn">
                Explore Categories
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle"></div>

            <div className="hero-card">
              <span>NEW COLLECTION</span>

              <h2>
                Timeless
                <br />
                Essentials
              </h2>

              <p>Discover the latest arrivals.</p>
            </div>
          </div>
        </div>
      </main>

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
// HOME ROUTE
// Unauthenticated users go to Register
// Authenticated users can access Home
// ========================================

function HomeRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return <Home />;
}

// ========================================
// AUTH ROUTE
// Logged-in users don't need Login/Register
// ========================================

function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ========================================
// APP
// ========================================

function App() {
  return (
    <Routes>
      {/* HOME */}

      <Route
        path="/"
        element={<HomeRoute />}
      />

      {/* LOGIN */}

      <Route
        path="/login"
        element={
          <GuestRoute>
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          </GuestRoute>
        }
      />

      {/* REGISTER */}

      <Route
        path="/register"
        element={
          <GuestRoute>
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          </GuestRoute>
        }
      />

      {/* SHOP */}

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

      {/* CATEGORIES */}

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

      {/* ABOUT */}

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

      {/* CART */}

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

      {/* PRODUCT DETAILS */}

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

      {/* CHECKOUT */}

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

      {/* ORDER SUCCESS */}

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

      {/* MY ORDERS */}

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

      {/* ORDER DETAILS */}

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

      {/* ADMIN ROUTES */}

      <Route element={<AdminRoute />}>
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

      {/* FALLBACK */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
