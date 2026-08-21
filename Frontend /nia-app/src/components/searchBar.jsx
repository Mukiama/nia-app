function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search places in Nairobi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="button">
        Search
      </button>
    </div>
  );
}

export default SearchBar;