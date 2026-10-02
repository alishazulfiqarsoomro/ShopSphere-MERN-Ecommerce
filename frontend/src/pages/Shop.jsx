import { useEffect, useState } from "react";
import {
  useSearchParams,
  Link,
} from "react-router-dom";

import {
  getProductsByCategory,
  getProducts,
} from "../services/productService";

import { useCart } from "../context/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let data;

        if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getProducts();
        }

        const productList = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(productList);
      } catch (error) {
        console.error("Products error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  // ==============================
  // ADD TO CART
  // ==============================
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // ==============================
  // CHECK CART
  // ==============================
  const isInCart = (productId) => {
    return cartItems.some(
      (item) => item._id === productId
    );
  };

  return (
    <section className="shop-page">
      <div className="container">

        {/* HEADER */}
        <div className="shop-heading">

          <p className="section-label">
            {category
              ? `${category.toUpperCase()} COLLECTION`
              : "SHOPSPHERE COLLECTION"}
          </p>

          <h1>
            {category ? (
              <>
                {category}
                <span> Products</span>
              </>
            ) : (
              <>
                Discover Our
                <span> Products</span>
              </>
            )}
          </h1>

          <p>
            {category
              ? `Explore our ${category.toLowerCase()} collection.`
              : "Explore our carefully selected collection of quality products."}
          </p>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="products-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading products...
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="products-error">

            <p>
              {error}
            </p>

          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && (
          <div className="products-grid">

            {products.length > 0 ? (

              products.map((product) => (

                <div
                  className="product-card"
                  key={product._id}
                >

                  {/* PRODUCT IMAGE */}
                  <div className="product-image">

                    <Link
                      to={`/product/${product._id}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>

                    {/* SALE */}
                    <span className="sale-badge">
                      SALE
                    </span>

                    {/* WISHLIST */}
                    <button
                      className="wishlist-btn"
                      type="button"
                    >
                      ♡
                    </button>

                    {/* ADD TO CART */}
                    <button
                      className="quick-add"
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      {isInCart(product._id)
                        ? "Add Again"
                        : "Add to Cart"}
                    </button>

                  </div>

                  {/* PRODUCT INFO */}
                  <div className="product-info">

                    <p className="product-category">
                      {product.category}
                    </p>

                    <Link
                      to={`/product/${product._id}`}
                      className="product-title-link"
                    >
                      <h3>
                        {product.name}
                      </h3>
                    </Link>

                    {/* RATING */}
                    <div className="product-rating">

                      <span>
                        ★
                      </span>

                      {product.rating || "0"}

                    </div>

                    {/* PRICE */}
                    <div className="product-price">

                      <strong>
                        ${product.price}
                      </strong>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="products-error">

                <p>
                  No products found in this category.
                </p>

              </div>

            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default Shop;