const features = [
  {
    icon: "✦",
    title: "Premium Quality",
    text: "Every product is carefully selected for quality and value.",
  },
  {
    icon: "↗",
    title: "Fast Delivery",
    text: "Get your favorite products delivered quickly and safely.",
  },
  {
    icon: "♡",
    title: "Secure Shopping",
    text: "Your privacy and security are always our priority.",
  },
  {
    icon: "◈",
    title: "Easy Returns",
    text: "Shop confidently with a simple and hassle-free return process.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container">

        <div className="why-heading">
          <p className="section-label">
            WHY SHOPSPHERE
          </p>

          <h2>
            Shopping should feel
            <span> effortless.</span>
          </h2>

          <p>
            Everything we do is designed to give you
            a better, simpler shopping experience.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature) => (
            <div className="why-card" key={feature.title}>

              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <span className="why-arrow">
                →
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;