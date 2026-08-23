
const [searchText, setSearchText] = useState("");
const [filters, setFilters] = useState({ category: "All", county: "All" });

const filteredPlaces = places.filter((place) => {
  const matchesSearch = place.name.toLowerCase().includes(searchText.toLowerCase());
  const matchesCategory = filters.category === "All" || place.category === filters.category;
  const matchesCounty = filters.county === "All" || place.county === filters.county;
  return matchesSearch && matchesCategory && matchesCounty;
});