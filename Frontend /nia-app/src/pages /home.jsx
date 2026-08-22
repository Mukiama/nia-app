import { useState } from "react";
import SearchBar from "../components/searchBar.jsx";
import FilterBar from "../components/filterBar.jsx";

const places = [
  { id: 1, name: "Gedi Ruins", county: "Kilifi", category: "Historical" },
  { id: 2, name: "Kit-Mikayi", county: "Kisumu", category: "Cultural" },
  { id: 3, name: "Kakamega Forest", county: "Kakamega", category: "Nature" },
];

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({ category: "All", county: "All" });

  const categories = [...new Set(places.map((p) => p.category))];
  const counties = [...new Set(places.map((p) => p.county))];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = filters.category === "All" || place.category === filters.category;
    const matchesCounty = filters.county === "All" || place.county === filters.county;
    return matchesSearch && matchesCategory && matchesCounty;
  });

  return (
    <div>
      <h2>Home</h2>
      <SearchBar onSearch={setSearchText} />
      <FilterBar categories={categories} counties={counties} onFilterChange={setFilters} />

      <ul>
        {filteredPlaces.map((p) => (
          <li key={p.id}>{p.name} — {p.county} ({p.category})</li>
        ))}
      </ul>
    </div>
  );
}
// searchText comes from SearchBar, filters comes from FilterBar
const [searchText, setSearchText] = useState("");
const [filters, setFilters] = useState({ category: "All", county: "All" });

// This runs every render and produces the final list to show
const filteredPlaces = places.filter((place) => {
  const matchesSearch = place.name.toLowerCase().includes(searchText.toLowerCase());
  const matchesCategory = filters.category === "All" || place.category === filters.category;
  const matchesCounty = filters.county === "All" || place.county === filters.county;
  return matchesSearch && matchesCategory && matchesCounty;
});