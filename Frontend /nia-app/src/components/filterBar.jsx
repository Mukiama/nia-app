import { useState, useEffect } from "react";

function FilterBar({
  categories,
  counties,
  selectedCategory,
  setSelectedCategory,
  onFilterChange,
}) {
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

  const cats =
    categories && categories.length
      ? categories
      : defaultCategories;

  const cnts =
    counties && counties.length
      ? counties
      : [];

  const [localCategory, setLocalCategory] = useState(
    selectedCategory || "All"
  );

  const [localCounty, setLocalCounty] = useState("All");

  useEffect(() => {
    if (selectedCategory !== undefined) {
      setLocalCategory(selectedCategory);
    }
  }, [selectedCategory]);

  function handleCategoryChange(event) {
    const newCategory = event.target.value;

    setLocalCategory(newCategory);

    if (setSelectedCategory) {
      setSelectedCategory(newCategory);
    }

    if (onFilterChange) {
      onFilterChange({
        category: newCategory,
        county: localCounty,
      });
    }
  }

  function handleCountyChange(event) {
    const newCounty = event.target.value;

    setLocalCounty(newCounty);

    if (onFilterChange) {
      onFilterChange({
        category: localCategory,
        county: newCounty,
      });
    }
  }

  function clearFilters() {
    setLocalCategory("All");
    setLocalCounty("All");

    if (setSelectedCategory) {
      setSelectedCategory("All");
    }

    if (onFilterChange) {
      onFilterChange({
        category: "All",
        county: "All",
      });
    }
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">
          Category
        </label>

        <select
          id="category-filter"
          className="filter-select"
          value={localCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">
            All Categories
          </option>

          {cats
            .filter((category) => category !== "All")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="county-filter">
          County
        </label>

        <select
          id="county-filter"
          className="filter-select"
          value={localCounty}
          onChange={handleCountyChange}
        >
          <option value="All">
            All Counties
          </option>

          {cnts.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="clear-filters"
        onClick={clearFilters}
      >
        Clear
      </button>
    </div>
  );
}

export default FilterBar;