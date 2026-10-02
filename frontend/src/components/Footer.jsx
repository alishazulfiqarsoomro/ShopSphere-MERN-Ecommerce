function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-top">

          <div className="footer-brand">
            <h2>Shop<span>Sphere</span></h2>

            <p>
              Thoughtfully selected products for
              a better everyday lifestyle.
            </p>

            <div className="footer-socials">
              <a href="#">IG</a>
              <a href="#">FB</a>
              <a href="#">LI</a>
              <a href="#">TK</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Shop</h3>

            <a href="/shop">All Products</a>
            <a href="/categories">Categories</a>
            <a href="/shop">New Arrivals</a>
            <a href="/shop">Best Sellers</a>
          </div>

          <div className="footer-column">
            <h3>Company</h3>

            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/about">Our Story</a>
            <a href="/contact">Help Center</a>
          </div>

          <div className="footer-column">
            <h3>Support</h3>

            <a href="#">Shipping & Delivery</a>
            <a href="#">Returns</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © 2026 ShopSphere. All rights reserved.
          </p>

          <p>
            Designed with care ✦
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;