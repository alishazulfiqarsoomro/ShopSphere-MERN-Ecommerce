import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        // Backend agar direct array return kare
        // ya { products: [] } return kare, dono handle honge
        const productList = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(productList.slice(0, 4));
      } catch (error) {
        console.error("Products loading error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="products-section">
      <div className="container">

        <div className="section-heading">
          <div>
            <p className="section-label">
              OUR SELECTION
            </p>

            <h2>
              Featured
              <span> Products</span>
            </h2>
          </div>

          <a href="/shop" className="view-all">
            View All
            <span>→</span>
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="products-loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="products-error">
            <p>{error}</p>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="products-grid">

            {products.length > 0 ? (
              products.map((product) => (
                <div
                  className="product-card"
                  key={product._id || product.id}
                >

                  <div className="product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span className="sale-badge">
                      SALE
                    </span>

                    <button
                      className="wishlist-btn"
                      type="button"
                    >
                      ♡
                    </button>

                    <button
                      className="quick-add"
                      type="button"
                    >
                      Add to Cart
                    </button>

                  </div>

                  <div className="product-info">

                    <p className="product-category">
                      {product.category}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <div className="product-rating">
                      <span>★</span>
                      {product.rating || "4.8"}
                    </div>

                    <div className="product-price">
                      <strong>
                        ${product.price}
                      </strong>

                      {product.oldPrice && (
                        <del>
                          ${product.oldPrice}
                        </del>
                      )}
                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="products-error">
                <p>No products found.</p>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;