
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ========================================
  // CHECKING AUTHENTICATION
  // ========================================

  if (loading) {
    return (
      <main className="admin-route-loading">
        <div className="admin-spinner"></div>

        <h2>Checking Access...</h2>

        <p>
          Please wait while we verify your account.
        </p>
      </main>
    );
  }

  // ========================================
  // NOT LOGGED IN
  // ========================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  // ========================================
  // NOT ADMIN
  // ========================================

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ========================================
  // ADMIN VERIFIED
  // ========================================

  return <Outlet />;
}

export default AdminRoute;

