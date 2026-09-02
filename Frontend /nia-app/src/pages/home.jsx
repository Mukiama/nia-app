import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

const API_URL = "https://nia-app-ik4c.onrender.com";

const categoryItems = [
  { name: "Nature", emoji: "🌿", className: "nature" },
  { name: "Food", emoji: "🍴", className: "food" },
  { name: "Art", emoji: "🎨", className: "art" },
  { name: "Culture", emoji: "✦", className: "culture" },
  { name: "Adventure", emoji: "↗", className: "adventure" },
  { name: "Nightlife", emoji: "✺", className: "nightlife" },
];

function Home() {
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/places`);

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        const data = await response.json();

        setPlaces(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("Error fetching places:", err);
        setError("We couldn't load the places right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  const normalizeCategory = (category) => {
    if (!category) return "Other";

    if (category.toLowerCase() === "cultural") {
      return "Culture";
    }

    return category;
  };

  const featuredPlace = useMemo(() => {
    return (
      places.find((place) => place.name === "Karura Forest") ||
      places[0] ||
      null
    );
  }, [places]);

  const discoveryPlaces = useMemo(() => {
    return places
      .filter((place) => place.id !== featuredPlace?.id)
      .slice(0, 6);
  }, [places, featuredPlace]);

  const editorialPlaces = useMemo(() => {
    return places.slice(0, 3);
  }, [places]);

  const searchResults = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return places
      .filter((place) => {
        const searchableText = [
          place.name,
          place.location,
          place.county,
          place.category,
          place.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(value);
      })
      .slice(0, 5);
  }, [search, places]);

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim().toLowerCase();

    if (!value) {
      navigate("/filter");
      return;
    }

    const exactMatch = places.find(
      (place) =>
        place.name?.toLowerCase() === value ||
        place.location?.toLowerCase() === value
    );

    if (exactMatch) {
      navigate(`/places/${exactMatch.id}`);
      return;
    }

    const firstMatch = places.find((place) => {
      const searchableText = [
        place.name,
        place.location,
        place.county,
        place.category,
        place.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(value);
    });

    if (firstMatch) {
      navigate(`/places/${firstMatch.id}`);
      return;
    }

    navigate("/filter");
  };

  const handleCategoryClick = (category) => {
    navigate(`/filter?category=${encodeURIComponent(category)}`);
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-noise"></div>

        <div className="home-hero-content">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>
              Kenya, but different
            </div>

            <h1>
              Find your
              <span> next thing.</span>
            </h1>

            <p className="hero-description">
              Discover beautiful places, hidden corners and experiences
              worth leaving home for.
            </p>

            <form className="home-search" onSubmit={handleSearch}>
              <span className="search-icon">⌕</span>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search places, areas or experiences..."
                aria-label="Search places"
              />

              <button type="submit">Search</button>

              {search.trim() && searchResults.length > 0 && (
                <div className="home-search-results">
                  {searchResults.map((place) => (
                    <Link
                      key={place.id}
                      to={`/places/${place.id}`}
                      className="home-search-result"
                      onClick={() => setSearch("")}
                    >
                      <img
                        src={place.image}
                        alt=""
                        className="home-search-result-image"
                      />

                      <span>
                        <strong>{place.name}</strong>

                        <small>
                          {place.location} ·{" "}
                          {normalizeCategory(place.category)}
                        </small>
                      </span>

                      <b>→</b>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            <div className="hero-actions">
              <Link to="/filter" className="primary-home-button">
                Explore places
                <span>↗</span>
              </Link>

              <Link to="/hidden-gems" className="secondary-home-button">
                Find hidden gems
              </Link>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <strong>{places.length || "—"}</strong>
                <span>places to explore</span>
              </div>

              <div className="hero-meta-line"></div>

              <div className="hero-meta-item">
                <strong>01</strong>
                <span>country, countless stories</span>
              </div>
            </div>
          </div>

          {featuredPlace && (
            <Link
              to={`/places/${featuredPlace.id}`}
              className="hero-place-link"
              aria-label={`Explore ${featuredPlace.name}`}
            >
              <article className="hero-place-card">
                <div className="hero-image-wrap">
                  <img
                    src={featuredPlace.image}
                    alt={featuredPlace.name}
                    className="hero-place-image"
                  />

                  <div className="hero-image-gradient"></div>

                  <span className="hero-place-tag">
                    NIA PICK <span>✦</span>
                  </span>

                  <span className="hero-place-arrow">↗</span>

                  <div className="hero-place-bottom">
                    <div>
                      <span className="hero-place-category">
                        {normalizeCategory(featuredPlace.category)}
                      </span>

                      <h2>{featuredPlace.name}</h2>

                      <p>
                        <span>⌖</span>{" "}
                        {featuredPlace.location}
                        {featuredPlace.county
                          ? `, ${featuredPlace.county}`
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hero-card-footer">
                  <span>Worth the detour</span>
                  <span>Explore place →</span>
                </div>
              </article>
            </Link>
          )}

          <div className="hero-sticker">
            <span>GO</span>
            <strong>OUT</strong>
            <small>• discover • wander • repeat •</small>
          </div>

          <div className="hero-doodle hero-doodle-one">✦</div>

          <div className="hero-doodle hero-doodle-two">+</div>
        </div>
      </section>

      <section className="home-categories">
        <div className="section-heading compact-heading">
          <div>
            <span className="section-kicker">CHOOSE YOUR MOOD</span>

            <h2>What are you into?</h2>
          </div>

          <p>
            From quiet green spaces to places that keep the night going.
          </p>
        </div>

        <div className="category-grid">
          {categoryItems.map((category) => (
            <button
              key={category.name}
              type="button"
              className={`category-pill ${category.className}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="category-emoji">{category.emoji}</span>

              <span>{category.name}</span>

              <span className="category-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-discover">
        <div className="section-heading">
          <div>
            <span className="section-kicker">THE NIA EDIT</span>

            <h2>Places worth knowing.</h2>
          </div>

          <Link to="/filter" className="text-link">
            See all places <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="home-loading">
            <div className="loading-circle"></div>

            <p>Finding places...</p>
          </div>
        ) : error ? (
          <div className="home-error">
            <p>{error}</p>

            <Link to="/filter">Open places explorer →</Link>
          </div>
        ) : discoveryPlaces.length === 0 ? (
          <div className="home-error">
            <p>No places are available right now.</p>

            <Link to="/filter">Open places explorer →</Link>
          </div>
        ) : (
          <div className="discovery-grid">
            {discoveryPlaces.map((place, index) => (
              <Link
                key={place.id}
                to={`/places/${place.id}`}
                className={`discovery-card discovery-card-${index + 1}`}
              >
                <div className="discovery-image-wrap">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="discovery-image"
                  />

                  <span className="discovery-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="discovery-open">↗</span>
                </div>

                <div className="discovery-content">
                  <div className="discovery-topline">
                    <span>
                      {normalizeCategory(place.category)}
                    </span>

                    <span>{place.location}</span>
                  </div>

                  <h3>{place.name}</h3>

                  <p>{place.description}</p>

                  <span className="discovery-link">
                    Explore place →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="home-editorial">
        <div className="editorial-copy">
          <span className="section-kicker">
            NOT JUST ANOTHER GUIDE
          </span>

          <h2>
            Nairobi has
            <em> layers.</em>
          </h2>

          <p>
            NIA is for the places that don't always make the first page of
            Google. The small discoveries, unexpected corners and experiences
            that make a city feel personal.
          </p>

          <Link to="/hidden-gems" className="editorial-button">
            Enter Hidden Gems
            <span>↗</span>
          </Link>
        </div>

        <div className="editorial-collage">
          {editorialPlaces.map((place, index) => (
            <Link
              key={place.id}
              to={`/places/${place.id}`}
              className={`editorial-image editorial-image-${index + 1}`}
            >
              <img src={place.image} alt={place.name} />

              <span>{place.name}</span>
            </Link>
          ))}

          <div className="editorial-badge">
            <span>DISCOVER</span>
            <strong>MORE</strong>
          </div>
        </div>
      </section>

      <section className="home-community">
        <div className="community-shape community-shape-one"></div>

        <div className="community-shape community-shape-two"></div>

        <div className="community-inner">
          <div className="community-symbol">✦</div>

          <span className="section-kicker">
            YOUR CITY. YOUR FINDS.
          </span>

          <h2>
            Know a place
            <br />
            <span>we should know?</span>
          </h2>

          <p>
            Help other explorers discover somewhere special by adding a place
            to NIA.
          </p>

          <div className="community-actions">
            <Link
              to="/add-place"
              className="community-primary"
            >
              Add a place <span>+</span>
            </Link>

            <Link
              to="/community"
              className="community-secondary"
            >
              Visit community →
            </Link>
          </div>
        </div>
      </section>

      <section className="home-quick-links">
        <Link to="/nia-picks" className="quick-link">
          <span className="quick-icon">✦</span>

          <span>
            <small>CURATED FOR YOU</small>
            NIA Picks
          </span>

          <strong>↗</strong>
        </Link>

        <Link to="/hidden-gems" className="quick-link">
          <span className="quick-icon">◎</span>

          <span>
            <small>LESSER KNOWN</small>
            Hidden Gems
          </span>

          <strong>↗</strong>
        </Link>

        <Link to="/offmap" className="quick-link">
          <span className="quick-icon">✦</span>

          <span>
            <small>NO PLANS? NO PROBLEM</small>
            Feeling Lucky
          </span>

          <strong>↗</strong>
        </Link>
      </section>

      <footer className="home-footer">
        <div className="home-footer-main">
          {/* BRAND */}

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              nia<span>.</span>
            </Link>

            <p>
              Discover the places,
              <br />
              stories and experiences
              <br />
              that make Nairobi special.
            </p>

            <span className="footer-location">
              Nairobi, Kenya · 01°17′S 36°49′E
            </span>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>

            <Link to="/">Home</Link>

            <Link to="/filter">All places</Link>

            <Link to="/hidden-gems">Hidden Gems</Link>

            <Link to="/nia-picks">NIA Picks</Link>
          </div>

          <div className="footer-column">
            <h3>Community</h3>

            <Link to="/community">Community</Link>

            <Link to="/add-place">Add a Place</Link>

            <Link to="/offmap">Feeling Lucky</Link>
          </div>


          <div className="footer-column">
            <h3>Your NIA</h3>

            <Link to="/profile">Profile</Link>

            <Link to="/history">History</Link>

            <Link to="/dashboard">Dashboard</Link>
          </div>


          <div className="footer-column">
            <h3>About</h3>

            <Link to="/about">About NIA</Link>

            <Link to="/offmap">Feeling Lucky</Link>
          </div>
        </div>


        <div className="home-footer-bottom">
          <span>
            © {new Date().getFullYear()} NIA. Made for curious people.
          </span>

          <div className="footer-bottom-links">
            <Link to="/about">About</Link>

            <Link to="/community">Community</Link>

            <Link to="/add-place">Add a place</Link>
          </div>

          <span className="footer-made">
            Made with curiosity <span>✦</span>
          </span>
        </div>
      </footer>
    </main>
  );
}

export default Home;