import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import hiddenGems from "../data/hiddenGems";
import "../styles/hiddenGems.css";

function HiddenGems() {
  const [activeVibe, setActiveVibe] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All");

  const vibes = [
    "All",
    "Get away",
    "Slow down",
    "Get inspired",
    "Picture perfect",
    "Adventure",
  ];

  const locations = [
    "All",
    ...new Set(hiddenGems.map((place) => place.location)),
  ];

  const filteredGems = useMemo(() => {
    return hiddenGems.filter((place) => {
      const matchesVibe =
        activeVibe === "All" || place.vibe.includes(activeVibe);

      const matchesLocation =
        activeLocation === "All" || place.location === activeLocation;

      return matchesVibe && matchesLocation;
    });
  }, [activeVibe, activeLocation]);

  const featuredGems = hiddenGems.slice(0, 4);

  return (
    <div className="hidden-gems-page">

      {/* HERO */}
      <section className="hidden-gems-hero">
        <div className="hidden-gems-hero-overlay"></div>

        <div className="hidden-gems-hero-content">
          <span className="eyebrow">NIA HIDDEN GEMS</span>

          <h1>
            The places Nairobi
            <br />
            doesn't put on the map.
          </h1>

          <p>
            Skip the usual spots. Discover tucked-away cafés,
            quiet escapes, creative spaces and unforgettable
            corners waiting to be found.
          </p>

          <div className="hidden-gems-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder='Try "quiet café", "sunset", "date night"...'
            />
          </div>
        </div>
      </section>

      {/* VIBES */}
      <section className="hidden-gems-vibes">
        <div className="section-heading">
          <span className="eyebrow">START EXPLORING</span>

          <h2>What's your kind of hidden?</h2>
        </div>

        <div className="vibe-list">
          {vibes.map((vibe) => (
            <button
              key={vibe}
              className={`vibe-button ${
                activeVibe === vibe ? "active" : ""
              }`}
              onClick={() => setActiveVibe(vibe)}
            >
              {vibe}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="hidden-section featured-section">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">DISCOVERED BY NIA</span>

            <h2>You weren't supposed to find this 👀</h2>

            <p>
              A few places worth keeping between you and your group chat.
            </p>
          </div>

          <Link to="/hidden-gems" className="view-all-link">
            View all <span>→</span>
          </Link>
        </div>

        <div className="featured-gems">
          {featuredGems.map((place) => (
            <article className="featured-gem-card" key={place.id}>
              <div className="featured-image-wrapper">
                <img
                  src={place.image}
                  alt={place.name}
                  className="featured-gem-image"
                />

                <span className="hidden-badge">
                  {place.hiddenLevel}
                </span>

                <button className="save-button" aria-label="Save place">
                  ♡
                </button>
              </div>

              <div className="featured-card-content">
                <div className="card-meta">
                  <span>{place.category}</span>
                  <span>•</span>
                  <span>{place.location}</span>
                </div>

                <h3>{place.name}</h3>

                <p>{place.description}</p>

                <div className="rating">
                  <span>★</span>
                  {place.rating}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HIDDEN LEVEL */}
      <section className="hidden-level-section">
        <div className="hidden-level-content">
          <span className="eyebrow">THE NIA SCALE</span>

          <h2>How hidden is your next adventure?</h2>

          <p>
            Not every hidden gem is equally hidden. Start somewhere
            familiar or go completely off the radar.
          </p>

          <div className="hidden-scale">

            <div className="scale-item">
              <span className="scale-number">01</span>
              <div>
                <h3>Almost Known</h3>
                <p>
                  Great places that haven't become overcrowded yet.
                </p>
              </div>
            </div>

            <div className="scale-item">
              <span className="scale-number">02</span>
              <div>
                <h3>Under the Radar</h3>
                <p>
                  Most people walk right past these.
                </p>
              </div>
            </div>

            <div className="scale-item">
              <span className="scale-number">03</span>
              <div>
                <h3>Deep Secret</h3>
                <p>
                  The kind of place you discover from a friend of a friend.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="hidden-section locations-section">
        <div className="section-heading">
          <span className="eyebrow">EXPLORE BY AREA</span>

          <h2>Hidden around Nairobi</h2>

          <p>You don't have to go far.</p>
        </div>

        <div className="location-list">
          {locations.map((location) => (
            <button
              key={location}
              className={`location-button ${
                activeLocation === location ? "active" : ""
              }`}
              onClick={() => setActiveLocation(location)}
            >
              {location}
            </button>
          ))}
        </div>

        <div className="gem-grid">
          {filteredGems.map((place) => (
            <article className="gem-card" key={place.id}>
              <div className="gem-image-wrapper">
                <img src={place.image} alt={place.name} />

                <button className="save-button" aria-label="Save place">
                  ♡
                </button>
              </div>

              <div className="gem-card-content">
                <div className="card-meta">
                  <span>{place.category}</span>
                  <span>•</span>
                  <span>{place.location}</span>
                </div>

                <h3>{place.name}</h3>

                <p>{place.description}</p>

                <div className="gem-footer">
                  <span className="rating">
                    ★ {place.rating}
                  </span>

                  <span className="hidden-level">
                    {place.hiddenLevel}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DISCOVERY CHALLENGE */}
      <section className="discovery-section">
        <div className="discovery-content">
          <span className="eyebrow">THE DISCOVERY CHALLENGE</span>

          <h2>Can you find these? 🔎</h2>

          <p>
            Some places are better discovered than searched for.
          </p>

          <div className="mystery-cards">

            <div className="mystery-card">
              <span>01</span>
              <div className="mystery-icon">?</div>
              <h3>The Secret Garden</h3>
              <p>Somewhere surrounded by green.</p>
            </div>

            <div className="mystery-card">
              <span>02</span>
              <div className="mystery-icon">?</div>
              <h3>The View Nobody Talks About</h3>
              <p>You'll want to bring your camera.</p>
            </div>

            <div className="mystery-card">
              <span>03</span>
              <div className="mystery-icon">?</div>
              <h3>The Door You Walk Past</h3>
              <p>What's behind it?</p>
            </div>

          </div>
        </div>
      </section>

      {/* FEELING LUCKY */}
      <section className="hidden-lucky-section">
        <div className="lucky-content">
          <span className="lucky-star">✦</span>

          <h2>Still don't know where to go?</h2>

          <p>
            Let Nia choose something you've probably never tried.
          </p>

          <Link to="/offmap" className="lucky-button">
            Feeling Lucky
            <span>→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default HiddenGems;