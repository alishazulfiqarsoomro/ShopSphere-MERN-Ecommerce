import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <main className="admin-dashboard-page">
      <div className="container">

        {/* HEADER */}
        <div className="admin-dashboard-header">
          <div>
            <p className="section-label">ADMIN PANEL</p>

            <h1>
              Welcome, <span>{user?.name || "Admin"}</span>
            </h1>

            <p>
              Manage your ShopSphere store from one place.
            </p>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="admin-dashboard-grid">

          {/* ORDERS */}
          <Link
            to="/admin/orders"
            className="admin-dashboard-card"
          >
            <div className="admin-card-icon">
              📦
            </div>

            <div>
              <h2>Orders</h2>
              <p>
                View and manage all customer orders.
              </p>
            </div>

            <span className="admin-card-arrow">
              →
            </span>
          </Link>

          {/* PRODUCTS */}
          <Link
            to="/shop"
            className="admin-dashboard-card"
          >
            <div className="admin-card-icon">
              🛍️
            </div>

            <div>
              <h2>Products</h2>
              <p>
                View and manage your store products.
              </p>
            </div>

            <span className="admin-card-arrow">
              →
            </span>
          </Link>

          {/* CUSTOMERS */}
          <div className="admin-dashboard-card">
            <div className="admin-card-icon">
              👥
            </div>

            <div>
              <h2>Customers</h2>
              <p>
                Manage registered customers.
              </p>
            </div>

            <span className="admin-card-arrow">
              →
            </span>
          </div>

          {/* SETTINGS */}
          <div className="admin-dashboard-card">
            <div className="admin-card-icon">
              ⚙️
            </div>

            <div>
              <h2>Settings</h2>
              <p>
                Manage store settings and configuration.
              </p>
            </div>

            <span className="admin-card-arrow">
              →
            </span>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="admin-quick-section">

          <h2>Quick Actions</h2>

          <div className="admin-quick-actions">

            <Link
              to="/admin/orders"
              className="primary-btn"
            >
              View All Orders
              <span>→</span>
            </Link>

            <Link
              to="/shop"
              className="secondary-btn"
            >
              View Store
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;