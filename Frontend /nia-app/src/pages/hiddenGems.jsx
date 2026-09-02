import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/hiddenGems.css";

const API_URL = "https://nia-app-ik4c.onrender.com";

function HiddenGems() {
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCounty, setSelectedCounty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [challengeStep, setChallengeStep] = useState(0);
  const [challengeAnswers, setChallengeAnswers] = useState({});
  const [challengeResult, setChallengeResult] = useState(null);

  const carouselRef = useRef(null);
  const resultsRef = useRef(null);

  /* =========================================
     FETCH PLACES
  ========================================= */

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
        setError("Could not load hidden gems. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  /* =========================================
     NORMALIZE CATEGORY
  ========================================= */

  const normalizeCategory = (category) => {
    if (category === "Cultural") {
      return "Culture";
    }

    return category;
  };

  /* =========================================
     HERO PLACES
     
     Center = Kit-Mikayi
     Left   = Gedi Ruins
     Right  = Kakamega Forest
  ========================================= */

  const heroPlaces = useMemo(() => {
    const preferredPlaces = [
      "Kit-Mikayi",
      "Gedi Ruins",
      "Kakamega Forest",
    ];

    return preferredPlaces
      .map((name) =>
        places.find(
          (place) =>
            place.name?.toLowerCase() === name.toLowerCase()
        )
      )
      .filter(Boolean);
  }, [places]);

  /* =========================================
     FILTER OPTIONS
  ========================================= */

  const counties = useMemo(() => {
    return [
      ...new Set(
        places
          .map((place) => place.county)
          .filter(Boolean)
      ),
    ];
  }, [places]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        places
          .map((place) => normalizeCategory(place.category))
          .filter(Boolean)
      ),
    ];
  }, [places]);

  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredPlaces = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    return places.filter((place) => {
      const matchesSearch =
        !searchValue ||
        place.name?.toLowerCase().includes(searchValue) ||
        place.location?.toLowerCase().includes(searchValue) ||
        place.county?.toLowerCase().includes(searchValue) ||
        place.category?.toLowerCase().includes(searchValue) ||
        place.description?.toLowerCase().includes(searchValue);

      const matchesCounty =
        selectedCounty === "All" ||
        place.county === selectedCounty;

      const matchesCategory =
        selectedCategory === "All" ||
        normalizeCategory(place.category) === selectedCategory;

      return (
        matchesSearch &&
        matchesCounty &&
        matchesCategory
      );
    });
  }, [
    places,
    searchTerm,
    selectedCounty,
    selectedCategory,
  ]);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const term = search.trim();

    setSearchTerm(term);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchTerm("");
  };

  /* =========================================
     CAROUSEL
  ========================================= */

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -380 : 380,
      behavior: "smooth",
    });
  };

  /* =========================================
     DISCOVERY CHALLENGE
  ========================================= */

  const challengeQuestions = [
    {
      question: "What's your mood?",
      key: "mood",
      options: [
        {
          label: "I want to relax",
          value: "relax",
        },
        {
          label: "I want an adventure",
          value: "adventure",
        },
        {
          label: "I want something cultural",
          value: "culture",
        },
        {
          label: "I want to explore nature",
          value: "nature",
        },
      ],
    },
    {
      question: "What are you into?",
      key: "category",
      options: [
        {
          label: "Nature",
          value: "Nature",
        },
        {
          label: "Culture",
          value: "Culture",
        },
        {
          label: "Adventure",
          value: "Adventure",
        },
        {
          label: "Anything interesting",
          value: "All",
        },
      ],
    },
    {
      question: "How far are you willing to go?",
      key: "location",
      options: [
        {
          label: "Around Nairobi",
          value: "Nairobi",
        },
        {
          label: "Somewhere nearby",
          value: "nearby",
        },
        {
          label: "Anywhere in Kenya",
          value: "anywhere",
        },
      ],
    },
  ];

  const currentQuestion =
    challengeQuestions[challengeStep];

  const handleChallengeAnswer = (value) => {
    const updatedAnswers = {
      ...challengeAnswers,
      [currentQuestion.key]: value,
    };

    setChallengeAnswers(updatedAnswers);

    if (
      challengeStep <
      challengeQuestions.length - 1
    ) {
      setChallengeStep((previous) => previous + 1);
      return;
    }

    let recommendations = [...places];

    if (
      updatedAnswers.category &&
      updatedAnswers.category !== "All"
    ) {
      const categoryMatches =
        recommendations.filter(
          (place) =>
            normalizeCategory(place.category) ===
            updatedAnswers.category
        );

      if (categoryMatches.length > 0) {
        recommendations = categoryMatches;
      }
    }

    if (updatedAnswers.location === "Nairobi") {
      const nairobiMatches =
        recommendations.filter(
          (place) =>
            place.county === "Nairobi" ||
            place.location === "Nairobi"
        );

      if (nairobiMatches.length > 0) {
        recommendations = nairobiMatches;
      }
    }

    if (updatedAnswers.mood === "nature") {
      const natureMatches =
        recommendations.filter(
          (place) =>
            normalizeCategory(place.category) ===
            "Nature"
        );

      if (natureMatches.length > 0) {
        recommendations = natureMatches;
      }
    }

    if (updatedAnswers.mood === "adventure") {
      const adventureMatches =
        recommendations.filter(
          (place) =>
            normalizeCategory(place.category) ===
            "Adventure"
        );

      if (adventureMatches.length > 0) {
        recommendations = adventureMatches;
      }
    }

    if (updatedAnswers.mood === "culture") {
      const cultureMatches =
        recommendations.filter(
          (place) =>
            normalizeCategory(place.category) ===
            "Culture"
        );

      if (cultureMatches.length > 0) {
        recommendations = cultureMatches;
      }
    }

    if (recommendations.length === 0) {
      recommendations = places;
    }

    if (recommendations.length > 0) {
      const randomPlace =
        recommendations[
          Math.floor(
            Math.random() * recommendations.length
          )
        ];

      setChallengeResult(randomPlace);
    }
  };

  const resetChallenge = () => {
    setChallengeStep(0);
    setChallengeAnswers({});
    setChallengeResult(null);
  };

  /* =========================================
     FEELING LUCKY
  ========================================= */

  const handleFeelingLucky = () => {
    if (!places.length) return;

    const randomPlace =
      places[
        Math.floor(
          Math.random() * places.length
        )
      ];

    navigate(`/places/${randomPlace.id}`);
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <main className="hidden-gems-page">
        <section className="hidden-loading">
          <div className="loading-symbol">✦</div>

          <h2>Finding hidden gems...</h2>

          <p>
            Looking beyond the usual places.
          </p>
        </section>
      </main>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error) {
    return (
      <main className="hidden-gems-page">
        <section className="hidden-error">
          <span>!</span>

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="hidden-gems-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="hidden-hero">

        <div className="hidden-hero-content">

          <p className="hidden-eyebrow">
            NIA / HIDDEN GEMS
          </p>

          <h1>
            Go beyond
            <br />
            the <span>obvious.</span>
          </h1>

          <p className="hidden-hero-description">
            There is more to Kenya than the places
            everyone already knows. Discover
            remarkable places hiding in plain sight.
          </p>

          <form
            className="hidden-search"
            onSubmit={handleSearch}
          >
            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search a place, county or experience..."
              aria-label="Search hidden gems"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

            <button
              type="submit"
              className="search-submit"
              aria-label="Search"
            >
              →
            </button>
          </form>

        </div>

        {/* =================================
            FLOATING HERO CARDS
        ================================= */}

        {heroPlaces.length > 0 && (
          <div className="floating-hero">

            {/* BACK — GEDI RUINS */}

            {heroPlaces[1] && (
              <Link
                to={`/places/${heroPlaces[1].id}`}
                className="floating-card floating-card-left"
                aria-label={`Explore ${heroPlaces[1].name}`}
              >
                <img
                  src={heroPlaces[1].image}
                  alt={heroPlaces[1].name}
                />

                <span className="floating-card-hover-label">
                  {heroPlaces[1].name} ↗
                </span>
              </Link>
            )}

            {/* FRONT — KIT-MIKAYI */}

            {heroPlaces[0] && (
              <Link
                to={`/places/${heroPlaces[0].id}`}
                className="floating-card floating-card-main"
                aria-label={`Explore ${heroPlaces[0].name}`}
              >
                <img
                  src={heroPlaces[0].image}
                  alt={heroPlaces[0].name}
                />

                <div className="floating-card-info">

                  <span>
                    ✦ HIDDEN GEM
                  </span>

                  <strong>
                    {heroPlaces[0].name}
                  </strong>

                  <small>
                    {heroPlaces[0].location} ·{" "}
                    {normalizeCategory(
                      heroPlaces[0].category
                    )}
                  </small>

                  <em>
                    Explore ↗
                  </em>

                </div>
              </Link>
            )}

            {/* BACK — KAKAMEGA FOREST */}

            {heroPlaces[2] && (
              <Link
                to={`/places/${heroPlaces[2].id}`}
                className="floating-card floating-card-right"
                aria-label={`Explore ${heroPlaces[2].name}`}
              >
                <img
                  src={heroPlaces[2].image}
                  alt={heroPlaces[2].name}
                />

                <span className="floating-card-hover-label">
                  {heroPlaces[2].name} ↗
                </span>
              </Link>
            )}

          </div>
        )}

        <div className="hero-decoration hero-decoration-one">
          ✦
        </div>

        <div className="hero-decoration hero-decoration-two">
          ○
        </div>

        <div className="hero-bottom-note">
          <span className="scroll-line"></span>
          SCROLL TO DISCOVER
        </div>

      </section>

      {/* =====================================
          DISCOVER
      ===================================== */}

      <section className="discover-section">

        <div className="discover-header">

          <p className="section-number">
            01 / DISCOVER
          </p>

          <h2>
            Places worth
            <br />
            <em>finding.</em>
          </h2>

        </div>

        <div className="carousel-wrapper">

          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={() =>
              scrollCarousel("left")
            }
            aria-label="Previous places"
          >
            ←
          </button>

          <div
            className="gem-carousel"
            ref={carouselRef}
          >
            {places.map((place, index) => (
              <article
                className="carousel-card"
                key={place.id}
              >

                <Link
                  to={`/places/${place.id}`}
                  className="carousel-image"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                  />

                  <span className="image-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </Link>

                <div className="carousel-content">

                  <div className="card-topline">
                    <span>
                      {place.location}
                    </span>

                    <span>•</span>

                    <span>
                      {normalizeCategory(
                        place.category
                      )}
                    </span>
                  </div>

                  <h3>{place.name}</h3>

                  <p>
                    {place.description}
                  </p>

                  <Link
                    to={`/places/${place.id}`}
                    className="explore-link"
                  >
                    Explore place
                    <span>↗</span>
                  </Link>

                </div>

              </article>
            ))}
          </div>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={() =>
              scrollCarousel("right")
            }
            aria-label="Next places"
          >
            →
          </button>

        </div>

      </section>

      {/* =====================================
          HIDDEN AROUND
      ===================================== */}

      <section
        className="around-section"
        ref={resultsRef}
      >

        <div className="around-heading">

          <div>

            <p className="section-number">
              02 / EXPLORE
            </p>

            <h2>
              {searchTerm ? (
                <>
                  Search
                  <br />
                  <span>results.</span>
                </>
              ) : (
                <>
                  Hidden
                  <br />
                  <span>around Kenya.</span>
                </>
              )}
            </h2>

          </div>

          <p className="around-description">
            {searchTerm
              ? `Showing places matching "${searchTerm}".`
              : "From forests and ruins to cultural landmarks and dramatic landscapes, discover places that deserve a spot on your map."}
          </p>

        </div>

        <div className="filter-controls">

          <div className="filter-group">

            <span>COUNTY</span>

            <select
              value={selectedCounty}
              onChange={(event) =>
                setSelectedCounty(
                  event.target.value
                )
              }
            >
              <option value="All">
                All counties
              </option>

              {counties.map((county) => (
                <option
                  value={county}
                  key={county}
                >
                  {county}
                </option>
              ))}
            </select>

          </div>

          <div className="filter-group">

            <span>TYPE</span>

            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value
                )
              }
            >
              <option value="All">
                All types
              </option>

              {categories.map((category) => (
                <option
                  value={category}
                  key={category}
                >
                  {category}
                </option>
              ))}
            </select>

          </div>

          <span className="results-count">
            {filteredPlaces.length}{" "}
            {filteredPlaces.length === 1
              ? "place"
              : "places"}
          </span>

        </div>

        {filteredPlaces.length > 0 ? (
          <div className="hidden-grid">

            {filteredPlaces.map(
              (place, index) => (
                <article
                  className="hidden-place"
                  key={place.id}
                >

                  <Link
                    to={`/places/${place.id}`}
                    className="hidden-place-image"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                    />

                    <span className="place-index">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </Link>

                  <div className="hidden-place-info">

                    <div className="place-meta">
                      <span>
                        {place.location}
                      </span>

                      <span>•</span>

                      <span>
                        {normalizeCategory(
                          place.category
                        )}
                      </span>
                    </div>

                    <Link
                      to={`/places/${place.id}`}
                      className="place-name"
                    >
                      {place.name}
                    </Link>

                    <p>
                      {place.description}
                    </p>

                    <Link
                      to={`/places/${place.id}`}
                      className="small-explore"
                    >
                      View details ↗
                    </Link>

                  </div>

                </article>
              )
            )}

          </div>
        ) : (
          <div className="no-results">

            <span>⌕</span>

            <h3>
              No hidden gems found
            </h3>

            <p>
              Try another search or remove a
              filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSearchTerm("");
                setSelectedCounty("All");
                setSelectedCategory("All");
              }}
            >
              Clear filters
            </button>

          </div>
        )}

      </section>

      {/* =====================================
          DISCOVERY CHALLENGE
      ===================================== */}

      <section className="challenge-section">

        <div className="challenge-intro">

          <p className="section-number">
            03 / DISCOVERY CHALLENGE
          </p>

          <h2>
            Let NIA
            <br />
            find your
            <br />
            <em>next place.</em>
          </h2>

          <p>
            Answer a few quick questions and
            we'll match you with somewhere
            worth exploring.
          </p>

        </div>

        <div className="challenge-box">

          {!challengeResult ? (
            <>
              <div className="challenge-progress">

                <span>
                  {challengeStep + 1} /{" "}
                  {challengeQuestions.length}
                </span>

                <div>
                  {challengeQuestions.map(
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          index <= challengeStep
                            ? "progress-active"
                            : ""
                        }
                      />
                    )
                  )}
                </div>

              </div>

              <h3>
                {currentQuestion.question}
              </h3>

              <div className="challenge-options">

                {currentQuestion.options.map(
                  (option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleChallengeAnswer(
                          option.value
                        )
                      }
                    >
                      {option.label}

                      <span className="option-arrow">
                        →
                      </span>
                    </button>
                  )
                )}

              </div>
            </>
          ) : (
            <div className="challenge-result">

              <p className="result-label">
                YOUR NIA MATCH
              </p>

              <div className="result-image">

                <img
                  src={challengeResult.image}
                  alt={challengeResult.name}
                />

              </div>

              <span className="result-category">
                {normalizeCategory(
                  challengeResult.category
                )}
              </span>

              <h3>
                {challengeResult.name}
              </h3>

              <p>
                {challengeResult.description}
              </p>

              <div className="result-actions">

                <Link
                  to={`/places/${challengeResult.id}`}
                  className="result-primary"
                >
                  Explore place ↗
                </Link>

                <button
                  className="result-secondary"
                  onClick={resetChallenge}
                >
                  Try again
                </button>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* =====================================
          FEELING LUCKY
      ===================================== */}

      <section className="lucky-section">

        <div className="lucky-mark">
          ✦
        </div>

        <p>
          NOT SURE WHERE TO GO?
        </p>

        <h2>
          Trust your
          <br />
          <span>curiosity.</span>
        </h2>

        <button
          className="lucky-button"
          onClick={handleFeelingLucky}
        >
          I'm feeling lucky
          <span>↗</span>
        </button>

      </section>

    </main>
  );
}

export default HiddenGems;