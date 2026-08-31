import { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/topbar";
import Hero from "./hero";
import Footer from "../components/footer";
import PlaceCard from "../components/placeCard";
import CommunitySection from "../components/communitySection";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Nature",
    "Food",
    "Art",
    "Culture",
    "Adventure",
    "Nightlife",
  ];

  const places = [
    {
      id: 1,
      name: "Karura Forest",
      category: "Nature",
      location: "Nairobi",
      description:
        "A beautiful forest with walking trails and waterfalls.",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b",
    },
    {
      id: 2,
      name: "The Alchemist",
      category: "Nightlife",
      location: "Westlands",
      description:
        "A creative entertainment and food space in Nairobi.",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    },
    {
      id: 3,
      name: "Nairobi National Museum",
      category: "Culture",
      location: "Nairobi",
      description:
        "Explore Kenyan history, art, culture and heritage.",
      image:
        "https://images.unsplash.com/photo-1564399579883-451a5d44ec08",
    },
    {
      id: 4,
      name: "Ngong Hills",
      category: "Adventure",
      location: "Ngong",
      description:
        "A scenic hiking destination with incredible views.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
  ];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase()) ||
      place.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // NEXT
  const handleNext = () => {
    const carousel = document.querySelector(".places-grid");

    if (carousel) {
      carousel.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  // BACK
  const handleBack = () => {
    const carousel = document.querySelector(".places-grid");

    if (carousel) {
      carousel.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Topbar />

      <main>
        <Hero />

        {/* =========================
            NIA PICKS
        ========================= */}
        <section className="picks-section">
          <div className="section-container">

            {/* HEADER */}
            <div className="picks-header">
              <div>
                <p className="section-eyebrow">
                  DISCOVER
                </p>

                <h2>Nia Picks</h2>

                <p>
                  Our curated selection of places from hidden corners to unforgettable experiences, these are places worth your time.
                </p>
              </div>

              <Link
                to="/nia-picks"
                className="view-all-link"
              >
                View All <span>→</span>
              </Link>
            </div>

            {/* FILTERS */}
            <div className="filter-bar">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            {/* CAROUSEL */}
            <div className="picks-carousel-wrapper">

              {/* BACK ARROW */}
              <button
                className="carousel-arrow carousel-arrow-left"
                onClick={handleBack}
                aria-label="Previous Nia Picks"
              >
                ←
              </button>

              {/* PLACE CARDS */}
              <div className="places-grid">
                {filteredPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                  />
                ))}
              </div>

              {/* NEXT ARROW */}
              <button
                className="carousel-arrow carousel-arrow-right"
                onClick={handleNext}
                aria-label="Next Nia Picks"
              >
                →
              </button>

            </div>
          </div>
        </section>

        {/* OFFMAP */}
        <section className="offmap-section">
          <div className="section-container">
            <p className="section-eyebrow">
              OFFMAP
            </p>

            <h2>
              Discover somewhere unexpected.
            </h2>

            <p>
              Skip the usual spots and discover somewhere
              you wouldn't normally think to visit.
            </p>

            <Link
              to="/offmap"
              className="offmap-button"
            >
              Explore OffMap →
            </Link>
          </div>
        </section>

        <CommunitySection />

        {/* =========================
            BUSINESS
        ========================= */}
        <section className="business-section">
          <div className="section-container">
            <h2>
              Own a hidden gem?
            </h2>

            <p>
              Help people discover your business on Nia.
            </p>

            <Link
              to="/list-business"
              className="business-button"
            >
              List Your Business
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;