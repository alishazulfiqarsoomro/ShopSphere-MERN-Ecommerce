const reviews = [
  {
    name: "Sarah Khan",
    role: "Verified Customer",
    rating: "★★★★★",
    text: "The quality was even better than I expected. Beautiful products and a very smooth shopping experience.",
  },
  {
    name: "Ayesha Ahmed",
    role: "Verified Customer",
    rating: "★★★★★",
    text: "I absolutely love ShopSphere. The products feel premium and my order arrived perfectly packed.",
  },
  {
    name: "Maham Ali",
    role: "Verified Customer",
    rating: "★★★★★",
    text: "Amazing experience from start to finish. The website is beautiful and ordering was super easy.",
  },
];

function Reviews() {
  return (
    <section className="reviews-section">
      <div className="container">

        <div className="reviews-heading">
          <p className="section-label">
            CUSTOMER LOVE
          </p>

          <h2>
            Loved by
            <span> thousands.</span>
          </h2>

          <p>
            Real experiences from people who shop with us.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.name}>

              <div className="review-stars">
                {review.rating}
              </div>

              <p className="review-text">
                “{review.text}”
              </p>

              <div className="review-user">
                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h3>{review.name}</h3>
                  <span>{review.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reviews;