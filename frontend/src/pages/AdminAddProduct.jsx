
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";

function AdminAddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category.trim() ||
      !formData.image.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    if (Number(formData.stock) < 0) {
      setError("Stock cannot be negative.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await createProduct({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        image: formData.image.trim(),
        stock: Number(formData.stock),
      });

      console.log("Create Product:", response);

      if (response?.success || response?.product) {
        alert("Product added successfully ✅");
        navigate("/admin/products");
      } else {
        setError(
          response?.message || "Unable to create product."
        );
      }
    } catch (error) {
      console.error("Create Product Error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-add-product-page">
      <div className="container">

        {/* HEADER */}
        <div className="admin-add-product-header">
          <div>
            <p className="section-label">
              ADMIN PANEL
            </p>

            <h1>
              Add New <span>Product</span>
            </h1>

            <p>
              Add a new product to your ShopSphere store.
            </p>
          </div>

          <button
            type="button"
            className="admin-back-btn"
            onClick={() => navigate("/admin/products")}
          >
            ← Back to Products
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="admin-product-error">
            ⚠ {error}
          </div>
        )}

        {/* FORM */}
        <form
          className="admin-add-product-form"
          onSubmit={handleSubmit}
        >
          <div className="admin-form-grid">

            {/* PRODUCT NAME */}
            <div className="admin-form-group">
              <label htmlFor="name">
                Product Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="admin-form-group">
              <label htmlFor="category">
                Category
              </label>

              <input
                id="category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                required
              />
            </div>

            {/* PRICE */}
            <div className="admin-form-group">
              <label htmlFor="price">
                Price
              </label>

              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* STOCK */}
            <div className="admin-form-group">
              <label htmlFor="stock">
                Stock
              </label>

              <input
                id="stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                min="0"
                step="1"
                required
              />
            </div>

            {/* IMAGE */}
            <div className="admin-form-group admin-form-full">
              <label htmlFor="image">
                Product Image URL
              </label>

              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                required
              />

              {formData.image && (
                <div className="product-image-preview">
                  <img
                    src={formData.image}
                    alt="Product Preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="admin-form-group admin-form-full">
              <label htmlFor="description">
                Product Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write product description..."
                rows="6"
                required
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="admin-form-actions">

            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => navigate("/admin/products")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-save-btn"
              disabled={loading}
            >
              {loading
                ? "Adding Product..."
                : "✓ Add Product"}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}

export default AdminAddProduct;

