
import { useState } from "react";

const categories = [
  {
    name: "Fashion",
    description: "Timeless styles for every occasion",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Electronics",
    description: "Smart technology for modern living",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Beauty",
    description: "Care, beauty and everyday essentials",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Home & Living",
    description: "Beautiful pieces for your space",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
];

const extraCategories = [
  {
    name: "Shoes",
    description: "Step into your perfect style",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Watches",
    description: "Elegant timepieces for every look",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Jewelry",
    description: "Small details, unforgettable style",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sports",
    description: "Gear up and stay active",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
];

function CategoryCard({ category }) {
  return (
    <a href="/shop" className="category-card">
      <img src={category.image} alt={category.name} />

      <div className="category-overlay"></div>

      <div className="category-content">
        <div>
          <p>{category.description}</p>
          <h3>{category.name}</h3>
        </div>

        <span className="category-arrow">↗</span>
      </div>
    </a>
  );
}

function Categories() {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll
    ? [...categories, ...extraCategories]
    : categories;

  return (
    <section className="categories-section">
      <div className="container">

        <div className="section-heading">
          <div>
            <p className="section-label">
              EXPLORE COLLECTIONS
            </p>

            <h2>
              Shop by
              <span> Category</span>
            </h2>
          </div>

          <button
            className="view-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
            <span>{showAll ? "↑" : "→"}</span>
          </button>
        </div>

        <div className="categories-grid">
          {visibleCategories.map((category) => (
            <CategoryCard
              category={category}
              key={category.name}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;

