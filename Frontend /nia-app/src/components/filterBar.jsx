import { useState, useEffect } from "react";

function FilterBar({ categories, counties, selectedCategory, setSelectedCategory, onFilterChange }) {
  const defaultCategories = [
    "All",
    "Photography",
    "Nature",
    "Food",
    "Art",
    "Culture",
    "Family",
    "Adventure",
    "Nightlife",
  ];

  const cats = categories && categories.length ? categories : defaultCategories;
  const cnts = counties && counties.length ? counties : [];

  const [localCategory, setLocalCategory] = useState(selectedCategory || "All");
  const [localCounty, setLocalCounty] = useState(cnts.length ? cnts[0] : "All");

  useEffect(() => {
    if (selectedCategory !== undefined) setLocalCategory(selectedCategory);
  }, [selectedCategory]);

  function handleCategoryChange(event) {
    const newCategory = event.target.value;
    if (setSelectedCategory) setSelectedCategory(newCategory);
    else setLocalCategory(newCategory);
    if (onFilterChange) onFilterChange({ category: newCategory, county: localCounty });
  }

  function handleCountyChange(event) {
    const newCounty = event.target.value;
    setLocalCounty(newCounty);
    if (onFilterChange) onFilterChange({ category: localCategory, county: newCounty });
  }

  return (
    <div className="filter-bar">
      <select value={localCategory} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        {cats.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {cnts.length > 0 && (
        <select value={localCounty} onChange={handleCountyChange}>
          <option value="All">All Counties</option>
          {cnts.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FilterBar;