import { useEffect, useState, useCallback, useRef } from "react";

import SearchBar from "../components/searchBar.jsx";
import FilterBar from "../components/filterBar.jsx";
import PlaceCard from "../components/placeCard.jsx";
import { authFetch } from "../api/client";

import "../styles/filter.css";

function Filter() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "All", county: "All" });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const loadingRef = useRef(false);

  const loadPage = useCallback(async (pageToLoad, isInitial) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      isInitial ? setLoading(true) : setLoadingMore(true);

      const response = await authFetch(`/places/?page=${pageToLoad}&per_page=10`);
      if (!response.ok) throw new Error("Failed to fetch places");

      const data = await response.json();

      setPlaces((prev) => (isInitial ? data.items : [...prev, ...data.items]));
      setHasMore(data.has_more);
      setPage(data.page);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not load places.");
    } finally {
      isInitial ? setLoading(false) : setLoadingMore(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadPage(1, true);

    // Categories come from every place in the DB, not just what's
    // loaded so far — separate call, independent of pagination.
    authFetch("/places/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Could not load categories:", err));
  }, [loadPage]);

  useEffect(() => {
    function handleScroll() {
      if (loadingRef.current || !hasMore) return;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 400;
      if (nearBottom) loadPage(page + 1, false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, loadPage]);

  const counties = [...new Set(places.map((p) => p.county).filter(Boolean))];

  const filteredPlaces = places.filter((place) => {
    const searchValue = search.trim().toLowerCase();
    const matchesSearch = !searchValue || place.name?.toLowerCase().includes(searchValue);
    const matchesCategory = filters.category === "All" || place.category === filters.category;
    const matchesCounty = filters.county === "All" || place.county === filters.county;
    return matchesSearch && matchesCategory && matchesCounty;
  });

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
          <div className="empty-state">
            <h3>No places found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        )}

        {!loading && !error && filteredPlaces.length > 0 && (
          <div className="places-grid">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}

        {loadingMore && <div className="status-message">Loading more places...</div>}
        {!loading && !hasMore && places.length > 0 && (
          <div className="status-message">You've reached the end.</div>
        )}
      </section>
    </main>
  );
}

export default Filter;