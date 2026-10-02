
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // ========================================
  // GET PRODUCTS
  // ========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      console.log("Admin Products:", response.data);

      if (response.data?.success) {
        setProducts(response.data.products || []);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Get Products Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ========================================
  // DELETE PRODUCT
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const response = await api.delete(
        `/products/${id}`
      );

      console.log("Delete Product:", response.data);

      alert("Product deleted successfully ✅");

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ========================================
  // STOCK STATUS
  // ========================================

  const getStockStatus = (stock) => {
    const quantity = Number(stock) || 0;

    if (quantity === 0) {
      return {
        text: "Out of Stock",
        className: "stock-out",
      };
    }

    if (quantity <= 5) {
      return {
        text: "Low Stock",
        className: "stock-low",
      };
    }

    return {
      text: "In Stock",
      className: "stock-good",
    };
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="admin-products-page">
        <div className="container">
          <div className="admin-products-loading">
            <div className="admin-spinner"></div>

            <h2>Loading Products...</h2>

            <p>
              Please wait while we fetch your
              products.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <main className="admin-products-page">
        <div className="container">
          <div className="admin-products-error">
            <div className="admin-error-icon">
              !
            </div>

            <h2>
              Unable to Load Products
            </h2>

            <p>{error}</p>

            <button
              type="button"
              className="admin-retry-btn"
              onClick={fetchProducts}
            >
              Try Again →
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
    <main className="admin-products-page">
      <div className="container">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="admin-products-heading">

          <div>
            <p className="section-label">
              ADMIN PANEL
            </p>

            <h1>
              Products <span>Management</span>
            </h1>

            <p>
              Add, edit and manage all products
              in your ShopSphere store.
            </p>
          </div>

          <div className="admin-product-count">
            <strong>
              {products.length}
            </strong>

            <span>
              Total Products
            </span>
          </div>

        </div>

        {/* ========================================
            ACTIONS
        ======================================== */}

        <div className="admin-products-actions">

          <Link
            to="/admin/products/add"
            className="admin-add-product-btn"
          >
            + Add New Product
          </Link>

          <button
            type="button"
            className="admin-refresh-btn"
            onClick={fetchProducts}
          >
            ↻ Refresh
          </button>

        </div>

        {/* ========================================
            EMPTY PRODUCTS
        ======================================== */}

        {products.length === 0 ? (

          <div className="admin-empty-products">

            <div className="admin-empty-icon">
              🛍️
            </div>

            <h2>
              No Products Found
            </h2>

            <p>
              Start adding products to your
              ShopSphere store.
            </p>

            <Link
              to="/admin/products/add"
              className="admin-add-product-btn"
            >
              + Add Product
            </Link>

          </div>

        ) : (

          /* ========================================
             PRODUCT GRID
          ======================================== */

          <div className="admin-products-grid">

            {products.map((product) => {

              const stockStatus =
                getStockStatus(product.stock);

              return (
                <div
                  className="admin-product-card"
                  key={product._id}
                >

                  {/* IMAGE */}

                  <div className="admin-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>

                  {/* CONTENT */}

                  <div className="admin-product-content">

                    {/* CATEGORY */}

                    <span className="admin-product-category">
                      {product.category ||
                        "Uncategorized"}
                    </span>

                    {/* NAME */}

                    <h2>
                      {product.name}
                    </h2>

                    {/* DESCRIPTION */}

                    <p className="admin-product-description">
                      {product.description
                        ? product.description.length >
                          100
                          ? `${product.description.slice(
                              0,
                              100
                            )}...`
                          : product.description
                        : "No description available."}
                    </p>

                    {/* PRICE + STOCK */}

                    <div className="admin-product-meta">

                      <strong>
                        $
                        {Number(
                          product.price
                        ).toFixed(2)}
                      </strong>

                      <div className="admin-stock-info">

                        <span>
                          Stock:{" "}
                          {Number(
                            product.stock
                          ) || 0}
                        </span>

                        <small
                          className={`admin-stock-status ${stockStatus.className}`}
                        >
                          {stockStatus.text}
                        </small>

                      </div>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="admin-product-actions">

                      {/* EDIT */}

                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="admin-edit-btn"
                      >
                        ✏️ Edit
                      </Link>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="admin-delete-btn"
                        disabled={
                          deletingId ===
                          product._id
                        }
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                      >
                        {deletingId ===
                        product._id
                          ? "Deleting..."
                          : "🗑️ Delete"}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}

export default AdminProducts;
