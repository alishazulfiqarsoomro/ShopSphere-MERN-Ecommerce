import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const data = await registerUser(formData);

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
            JOIN SHOPSPHERE
          </p>

          <h1>
            Create your
            <span> account.</span>
          </h1>

          <p>
            Create an account and start your
            shopping journey with us.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* NAME */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password"
              minLength="6"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}

            <span>→</span>
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

        </form>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "13px",
            color: "#777",
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            style={{
              color: "var(--gold)",
              fontWeight: "700",
            }}
          >
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Register;