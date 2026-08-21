import { useState } from "react";
import SearchBar from "./components/searchBar.jsx";
import FilterBar from "./components/filterBar.jsx";
import Signup from "./pages /signup.jsx";

// A small temporary list of places, just so we can test Search and Filter.
// Once Mukiama merges the real places.js data, we'll swap this out.
const places = [
  { id: 1, name: "Gedi Ruins", county: "Kilifi", category: "Historical" },
  { id: 2, name: "Kit-Mikayi", county: "Kisumu", category: "Cultural" },
  { id: 3, name: "Kakamega Forest", county: "Kakamega", category: "Nature" },
  { id: 4, name: "Fort Jesus", county: "Mombasa", category: "Historical" },
  { id: 5, name: "Lamu Old Town", county: "Lamu", category: "Cultural" },
  { id: 6, name: "Hell's Gate National Park", county: "Nakuru", category: "Adventure" },
];

function App() {

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({ category: "All", county: "All" });

  
  const categories = [...new Set(places.map((place) => place.category))];
  const counties = [...new Set(places.map((place) => place.county))];


  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = filters.category === "All" || place.category === filters.category;
    const matchesCounty = filters.county === "All" || place.county === filters.county;
    return matchesSearch && matchesCategory && matchesCounty;
  });

  return (
    <div>
      
      <h1>Nia — Find your next thing</h1>

      <Signup/>
      
      <SearchBar onSearch={setSearchText} />
      <FilterBar categories={categories} counties={counties} onFilterChange={setFilters} />

      <ul>
        {filteredPlaces.map((place) => (
          <li key={place.id}>
            {place.name} — {place.county} ({place.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;