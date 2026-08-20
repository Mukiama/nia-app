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