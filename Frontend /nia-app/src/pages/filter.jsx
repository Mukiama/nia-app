import { useEffect, useState } from "react";

import SearchBar from "../components/searchBar.jsx";
import FilterBar from "../components/filterBar.jsx";

import PlaceCard from "../components/placeCard.jsx";
import { authFetch } from "../api/client";

import "../styles/filter.css";

function Filter() {
  const [places, setPlaces] = useState([]);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "All",
    county: "All",
  });

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.set("page", 1);
        if (search) params.set("q", search);
        if (filters.category && filters.category !== "All") {
          params.set("category", filters.category);
        }

        const response = await authFetch(`/places/?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        const data = await response.json();

        setPlaces(data.items);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Could not load places. Make sure the mock API is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, [search, filters]);

  const categories = [
    ...new Set(places.map((place) => place.category).filter(Boolean)),
  ];

  const counties = [
    ...new Set(places.map((place) => place.county).filter(Boolean)),
  ];

  const filteredPlaces = places;

  return (
    <main className="filter-page">
      <section className="filter-hero">
        <p className="filter-eyebrow">DISCOVER KENYA</p>
        <h1>Find your<span> next thing.</span></h1>
        <p className="filter-description">
          Discover places worth exploring, from hidden cultural gems to unforgettable experiences.
        </p>
        <div className="search-area">
          <SearchBar search={search} setSearch={setSearch} />
          <FilterBar categories={categories} counties={counties} onFilterChange={setFilters} />
        </div>
      </section>

      <section className="places-section">
        <div className="places-heading">
          <div>
            <p className="section-label">EXPLORE</p>
            <h2>{filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}</h2>
          </div>
        </div>

        {loading && <div className="status-message">Loading places...</div>}
        {!loading && error && <div className="status-message error">{error}</div>}
        {!loading && !error && filteredPlaces.length === 0 && (
          <div className="empty-state"><h3>No places found</h3><p>Try changing your search or filters.</p></div>
        )}
        {!loading && !error && filteredPlaces.length > 0 && (
          <div className="places-grid">
            {filteredPlaces.map((place) => <PlaceCard key={place.id} place={place} />)}
          </div>
        )}
      </section>
    </main>
  );
}

export default Filter;
