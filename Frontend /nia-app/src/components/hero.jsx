function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">Find your next thing</p>

        <h1>
          Discover what's
          <br />
          around you.
        </h1>

        <p className="hero-description">
          Find interesting places and experiences that match your
          interests, budget, who you're with, and location.
        </p>

        <div className="hero-actions">
          <button className="hero-primary">
            Explore Nearby
          </button>

          <button className="hero-secondary">
            Surprise Me
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;