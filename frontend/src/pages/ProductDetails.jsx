import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        const productData = data.product || data;

        setProduct(productData);
      } catch (error) {
        console.error("Product details error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="container product-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="container product-details-error">
          <h2>Product Not Found</h2>

          <p>
            {error || "This product is no longer available."}
          </p>

          <Link
            to="/shop"
            className="primary-btn"
          >
            Back to Shop
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="container">

        {/* BACK TO SHOP */}
        <Link
          to="/shop"
          className="back-to-shop"

        >
          ← Back to Shop
        </Link>

        <div className="product-details">

          {/* PRODUCT IMAGE */}
          <div className="product-details-image">

            <img
              src={product.image}
              alt={product.name}
            />

            <span className="details-sale-badge">
              SALE
            </span>

          </div>

          {/* PRODUCT INFORMATION */}
          <div className="product-details-info">

            <p className="section-label">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            {/* RATING */}
            <div className="details-rating">
              <span>★</span>

              <strong>
                {product.rating || "0"}
              </strong>

              <span>
                ({product.numReviews || 0} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="details-price">
              ${product.price}
            </div>

            {/* DESCRIPTION */}
            <p className="details-description">
              {product.description}
            </p>

            {/* STOCK */}
            <div className="stock-status">
              {product.stock > 0 ? (
                <>
                  <span className="stock-dot"></span>
                  {product.stock} items available
                </>
              ) : (
                <span className="out-of-stock">
                  Out of Stock
                </span>
              )}
            </div>

            {/* QUANTITY */}
            {product.stock > 0 && (
              <div className="details-quantity">

                <span>
                  Quantity
                </span>

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>

                </div>

              </div>
            )}

            {/* ADD TO CART */}
            <button
              type="button"
              className="details-add-cart"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}

              {product.stock > 0 && (
                <span>→</span>
              )}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

export default ProductDetails;