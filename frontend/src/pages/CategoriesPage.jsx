import { Link } from "react-router-dom";

const categories = [
  {
    name: "Fashion",
    description: "Timeless styles for your everyday look.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Watches",
    description: "Elegant watches designed for every moment.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Shoes",
    description: "Step into comfort, quality and modern style.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Electronics",
    description: "Smart essentials for modern everyday life.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
  },
];

function CategoriesPage() {
  return (
    <section className="categories-page">
      <div className="container">

        {/* HEADER */}
        <div className="categories-heading">
          <p className="section-label">
            SHOP BY CATEGORY
          </p>

          <h1>
            Explore Our
            <span> Categories</span>
          </h1>

          <p>
            Find exactly what you're looking for
            from our carefully selected collections.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="categories-page-grid">
          {categories.map((category) => (
            <Link
              to={`/shop?category=${encodeURIComponent(
                category.name
              )}`}
              className="category-page-card"
              key={category.name}
            >
              <div className="category-page-image">
                <img
                  src={category.image}
                  alt={category.name}
                />

                <div className="category-overlay">
                  <span>Explore</span>
                  <strong>→</strong>
                </div>
              </div>

              <div className="category-page-info">
                <h2>{category.name}</h2>

                <p>
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategoriesPage;