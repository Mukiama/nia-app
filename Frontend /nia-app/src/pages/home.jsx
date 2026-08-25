import { useState } from "react";
import Navbar from "../components/navbar";
import Hero from "./hero";
import Footer from "../components/footer";
import SearchBar from "../components/searchBar";
import FilterBar from "../components/filterBar";
import PlaceCard from "../components/placeCard";


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

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* INTERESTS */}
        <section className="interests-section">
          <div className="section-container">
            <p className="section-eyebrow">
              START EXPLORING
            </p>

            <h2>What are you into?</h2>

            <div className="interest-list">
              <button>📸 Photography</button>
              <button>🌿 Nature</button>
              <button>☕ Food</button>
              <button>🎨 Art</button>
              <button>🏛️ Culture</button>
              <button>👨‍👩‍👧 Family</button>
              <button>🥾 Adventure</button>
              <button>🌙 Nightlife</button>
            </div>
          </div>
        </section>

        {/* WHO ARE YOU WITH */}
        <section className="companions-section">
          <div className="section-container">
            <p className="section-eyebrow">
              MAKE IT PERSONAL
            </p>

            <h2>Who are you with?</h2>

            <p>
              Tell us who you're exploring with and we'll help
              you find places that fit.
            </p>

            <div className="companion-list">
              <button>🧍 Solo</button>
              <button>❤️ Partner</button>
              <button>👨‍👩‍👧 Family</button>
              <button>👯 Friends</button>
              <button>💼 Colleagues</button>
              <button>🎒 Kids</button>
            </div>
          </div>
        </section> 

        {/* NIA PICKS */}
        <section className="picks-section">
          <div className="section-container">
            <p className="section-eyebrow">
              DISCOVER
            </p>

            <h2>Nia Picks</h2>

            <p>
              Interesting places we think you'll love.
            </p>


          
            <div className="filter-bar">
              {categories.map((category) => (
                 <button
                   key={category}
                   className={selectedCategory === category ? "active" : ""}
                   onClick={() => setSelectedCategory(category)}
                 >
                   {category}
             </button>
             ))}
            </div>

          
            <div className="places-grid">
              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                />
              ))}
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

            <button>
              Explore OffMap
            </button>
          </div>
        </section>

        
        <section className="business-section">
          <div className="section-container">
            <h2>
              Own a hidden gem?
            </h2>

            <p>
              Help people discover your business on Nia.
            </p>

            <button>
              List Your Business
            </button>
          </div>
        </section>
      </main> 

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Home;