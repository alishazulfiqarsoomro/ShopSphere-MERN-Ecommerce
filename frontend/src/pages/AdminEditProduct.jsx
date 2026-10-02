
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../services/productService";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // GET PRODUCT
  // ========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        console.log("Product to Edit:", response);

        const product = response?.product;

        if (!product) {
          setError("Product not found.");
          return;
        }

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price ?? "",
          category: product.category || "",
          image: product.image || "",
          stock: product.stock ?? "",
        });
      } catch (error) {
        console.error("Get Product Error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ========================================
  // UPDATE PRODUCT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category.trim() ||
      !formData.image.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateProduct(id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        image: formData.image.trim(),
        stock: Number(formData.stock),
      });

      console.log("Product Updated:", response);

      if (response?.success || response?.product) {
        alert("Product updated successfully ✅");
        navigate("/admin/products");
      } else {
        setError(
          response?.message ||
            "Unable to update product."
        );
      }
    } catch (error) {
      console.error("Update Product Error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="admin-edit-product-page">
        <div className="container">
          <div className="admin-edit-loading">
            <div className="admin-spinner"></div>

            <h2>Loading Product...</h2>

            <p>
              Please wait while we load the
              product details.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // PRODUCT NOT FOUND
  // ========================================

  if (error && !formData.name) {
    return (
      <main className="admin-edit-product-page">
        <div className="container">
          <div className="admin-edit-error">
            <div className="admin-error-icon">
              !
            </div>

            <h2>
              Unable to Load Product
            </h2>

            <p>{error}</p>

            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() =>
                navigate("/admin/products")
              }
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="admin-edit-product-page">
      <div className="container">

        {/* HEADER */}

        <div className="admin-edit-product-header">
          <div>
            <p className="section-label">
              ADMIN PANEL
            </p>

            <h1>
              Edit <span>Product</span>
            </h1>

            <p>
              Update product information in
              your ShopSphere store.
            </p>
          </div>

          <button
            type="button"
            className="admin-back-btn"
            onClick={() =>
              navigate("/admin/products")
            }
          >
            ← Back to Products
          </button>
        </div>

        {/* FORM CARD */}

        <div className="admin-product-form-card">
          <form onSubmit={handleSubmit}>

            {/* ERROR */}

            {error && (
              <div className="admin-product-form-error">
                ⚠ {error}
              </div>
            )}

            {/* NAME */}

            <div className="admin-form-group">
              <label htmlFor="name">
                Product Name *
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

            {/* DESCRIPTION */}

            <div className="admin-form-group">
              <label htmlFor="description">
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="5"
                required
              />
            </div>

            {/* PRICE + STOCK */}

            <div className="admin-form-row">

              <div className="admin-form-group">
                <label htmlFor="price">
                  Price *
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="stock">
                  Stock *
                </label>

                <input
                  id="stock"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  required
                />
              </div>

            </div>

            {/* CATEGORY */}

            <div className="admin-form-group">
              <label htmlFor="category">
                Category *
              </label>

              <input
                id="category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics, Fashion"
                required
              />
            </div>

            {/* IMAGE */}

            <div className="admin-form-group">
              <label htmlFor="image">
                Product Image URL *
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
            </div>

            {/* IMAGE PREVIEW */}

            {formData.image && (
              <div className="admin-image-preview">
                <p>Image Preview</p>

                <img
                  src={formData.image}
                  alt={formData.name}
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              </div>
            )}

            {/* BUTTONS */}

            <div className="admin-product-form-actions">

              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() =>
                  navigate("/admin/products")
                }
                disabled={saving}
              >
                ← Cancel
              </button>

              <button
                type="submit"
                className="admin-create-product-btn"
                disabled={saving}
              >
                {saving
                  ? "Updating..."
                  : "Update Product →"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}

export default AdminEditProduct;
