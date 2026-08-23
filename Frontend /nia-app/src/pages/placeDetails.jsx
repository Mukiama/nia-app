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
    categories && categories.length ? categories : defaultCategories;

  const cnts = counties && counties.length ? counties : [];

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
    <div className="filter-section">
      <div className="filter-heading">
        <div>
          <h2>Explore places</h2>
          <p>Find places based on what you're looking for.</p>
        </div>

        <button
          type="button"
          className="clear-filters"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>

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
            {cats.map((category) => (
              <option key={category} value={category}>
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>
        </div>

        {cnts.length > 0 && (
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
              <option value="All">All Counties</option>

              {cnts.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;