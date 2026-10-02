function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="container newsletter-container">

        <div className="newsletter-content">
          <p className="section-label">
            STAY IN THE LOOP
          </p>

          <h2>
            Get the latest
            <span> from ShopSphere.</span>
          </h2>

          <p>
            Subscribe for new arrivals, exclusive offers,
            and inspiration delivered straight to your inbox.
          </p>
        </div>

        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />

          <button type="submit">
            Subscribe
            <span>→</span>
          </button>
        </form>

      </div>
    </section>
  );
}

export default Newsletter;