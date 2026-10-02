function AboutPage() {
  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <p className="section-label">
            ABOUT SHOPSPHERE
          </p>

          <h1>
            Better Products.
            <br />
            <span>Better Everyday.</span>
          </h1>

          <p>
            ShopSphere is a modern online shopping
            destination built around quality, simplicity,
            and products that make everyday life better.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="container about-story-grid">

          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80"
              alt="ShopSphere shopping experience"
            />
          </div>

          <div className="about-story-content">
            <p className="section-label">
              OUR STORY
            </p>

            <h2>
              Designed for
              <span> modern living.</span>
            </h2>

            <p>
              At ShopSphere, we believe shopping should
              be simple, enjoyable, and trustworthy.
              That's why we carefully select products
              that combine quality, functionality,
              and modern design.
            </p>

            <p>
              From fashion and watches to shoes and
              electronics, our collection is created
              to bring useful and beautiful products
              closer to you.
            </p>

            <a href="/shop" className="primary-btn">
              Explore Products
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">

          <div className="section-heading about-values-heading">
            <div>
              <p className="section-label">
                WHAT WE STAND FOR
              </p>

              <h2>
                Our Core
                <span> Values</span>
              </h2>
            </div>
          </div>

          <div className="values-grid">

            <div className="value-card">
              <div className="value-number">
                01
              </div>

              <h3>
                Quality First
              </h3>

              <p>
                We focus on products that offer
                dependable quality and lasting value.
              </p>
            </div>

            <div className="value-card">
              <div className="value-number">
                02
              </div>

              <h3>
                Simple Shopping
              </h3>

              <p>
                A clean and easy shopping experience
                from discovery to checkout.
              </p>
            </div>

            <div className="value-card">
              <div className="value-number">
                03
              </div>

              <h3>
                Customer First
              </h3>

              <p>
                Your satisfaction is at the heart
                of everything we build.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">

          <p className="section-label">
            READY TO EXPLORE?
          </p>

          <h2>
            Find something
            <span> you'll love.</span>
          </h2>

          <p>
            Explore our collection and discover
            your next everyday essential.
          </p>

          <a href="/shop" className="primary-btn">
            Shop Now
            <span>→</span>
          </a>

        </div>
      </section>

    </main>
  );
}

export default AboutPage;