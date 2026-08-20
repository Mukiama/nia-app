import { useState } from "react";

function FilterBar({ categories, counties, onFilterChange }) {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCounty, setSelectedCounty] = useState("All");


  function handleCategoryChange(event) {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);

    onFilterChange({ category: newCategory, county: selectedCounty });
  }


  function handleCountyChange(event) {
    const newCounty = event.target.value;
    setSelectedCounty(newCounty);
    onFilterChange({ category: selectedCategory, county: newCounty });
  }

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={selectedCounty} onChange={handleCountyChange}>
        <option value="All">All Counties</option>
        {counties.map((county) => (
          <option key={county} value={county}>
            {county}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;