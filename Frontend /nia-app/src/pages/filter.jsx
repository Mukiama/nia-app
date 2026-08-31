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

  const [error, setError] = useState("");

  /* ================================
     FETCH PLACES
  ================================= */

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setLoading(true);

        // Was: hardcoded Render URL, no auth header — /places/ requires a
        // JWT on the real backend, so this always came back 401.
        const response = await authFetch("/places/");

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        const data = await response.json();

        setPlaces(data);
        setError("");
      } catch (error) {
        console.error(error);

        setError(
          "Could not load places. Make sure the mock API is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  /* ================================
     FILTER OPTIONS
  ================================= */

  const categories = [
    ...new Set(
      places
        .map((place) => place.category)
        .filter(Boolean)
    ),
  ];

  const counties = [
    ...new Set(
      places
        .map((place) => place.county)
        .filter(Boolean)
    ),
  ];

  /* ================================
     SEARCH + FILTER
  ================================= */

  const filteredPlaces = places.filter((place) => {
    const searchValue = search
      .trim()
      .toLowerCase();

    const matchesSearch =
      !searchValue ||
      place.name
        ?.toLowerCase()
        .includes(searchValue);

    const matchesCategory =
      filters.category === "All" ||
      place.category === filters.category;

    const matchesCounty =
      filters.county === "All" ||
      place.county === filters.county;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCounty
    );
  });

  /* ================================
     RENDER
  ================================= */

  return (
    <main className="filter-page">

      <section className="filter-hero">

        <p className="filter-eyebrow">
          DISCOVER KENYA
        </p>

        <h1>
          Find your
          <span> next thing.</span>
        </h1>

        <p className="filter-description">
          Discover places worth exploring,
          from hidden cultural gems to
          unforgettable experiences.
        </p>

        <div className="search-area">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <FilterBar
            categories={categories}
            counties={counties}
            onFilterChange={setFilters}
          />

        </div>

      </section>


      <section className="places-section">

        <div className="places-heading">

          <div>
            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              {filteredPlaces.length}{" "}
              {filteredPlaces.length === 1
                ? "place"
                : "places"}
            </h2>
          </div>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="status-message">
            Loading places...
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="status-message error">
            {error}
          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredPlaces.length === 0 && (
            <div className="empty-state">

              <h3>
                No places found
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

            </div>
          )}


        {/* RESULTS */}

        {!loading &&
          !error &&
          filteredPlaces.length > 0 && (

            <div className="places-grid">

              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                />
              ))}

            </div>

          )}

      </section>

    </main>
  );
}

export default Filter;