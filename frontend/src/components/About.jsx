function About() {
  return (
    <section className="about-section">
      <div className="container about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
            alt="ShopSphere Store"
          />

          <div className="about-badge">
            <strong>5+</strong>
            <span>Years of Style</span>
          </div>
        </div>

        <div className="about-content">

          <p className="section-label">
            ABOUT SHOPSPHERE
          </p>

          <h2>
            More than a store.
            <span> A lifestyle.</span>
          </h2>

          <p className="about-text">
            ShopSphere brings quality products, modern style,
            and a smooth shopping experience together in one place.
            We carefully select products that make your everyday
            life simpler, smarter, and more beautiful.
          </p>

          <div className="about-stats">

            <div className="about-stat">
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>

            <div className="about-stat">
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div className="about-stat">
              <strong>4.9</strong>
              <span>Customer Rating</span>
            </div>

          </div>

          <a href="/about" className="about-btn">
            Discover Our Story
            <span>→</span>
          </a>

        </div>

      </div>
    </section>
  );
}

export default About;