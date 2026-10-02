import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = await loginUser(formData);

      // Save logged-in user in AuthContext
      setUser(data.user);

      setMessage(data.message);

      console.log("Logged in user:", data.user);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        <div className="auth-heading">
          <p className="section-label">
            WELCOME BACK
          </p>

          <h1>
            Login to
            <span> ShopSphere.</span>
          </h1>

          <p>
            Sign in to continue your shopping experience.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* EMAIL */}
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}

            <span>→</span>
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

        </form>

      </div>
    </section>
  );
}

export default Login;