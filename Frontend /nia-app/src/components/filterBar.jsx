function FilterBar({ selectedCategory, setSelectedCategory }) {
  const categories = [
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

  return (
    <div className="filter-list">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;