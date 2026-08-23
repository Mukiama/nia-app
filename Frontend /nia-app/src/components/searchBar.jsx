import { useState, useEffect } from "react";

function SearchBar({ search, setSearch, onSearch }) {
  const [searchText, setSearchText] = useState(search || "");

  useEffect(() => {
    if (search !== undefined) setSearchText(search);
  }, [search]);

  function handleChange(e) {
    const val = e.target.value;
    if (setSearch) setSearch(val);
    setSearchText(val);
    if (onSearch) onSearch(val);
  }

  function handleSubmit() {
    if (onSearch) onSearch(searchText);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search places in Nairobi..."
        value={searchText}
        onChange={handleChange}
      />

      <button type="button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;