
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

// ========================================
// CREATE AUTH CONTEXT
// ========================================

const AuthContext = createContext();

// ========================================
// AUTH PROVIDER
// ========================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // CHECK CURRENT USER
  // ========================================

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getCurrentUser();

        console.log("CURRENT USER:", data?.user);

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Check User Error:",
          error.response?.data || error.message
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // ========================================
  // LOGOUT
  // ========================================

  const logout = async () => {
    try {
      await logoutUser();

      setUser(null);

      console.log("User logged out successfully");
    } catch (error) {
      console.error(
        "Logout Error:",
        error.response?.data || error.message
      );

      // Even if API logout fails,
      // remove user from frontend
      setUser(null);
    }
  };

  // ========================================
  // AUTH CONTEXT VALUE
  // ========================================

  const value = {
    user,
    setUser,
    logout,
    loading,

    // Easy admin check
    isAdmin: user?.role === "admin",
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// USE AUTH HOOK
// ========================================

export const useAuth = () => {
  return useContext(AuthContext);
};

