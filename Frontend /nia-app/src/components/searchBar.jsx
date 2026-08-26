import { useEffect, useState } from "react";

function SearchBar({ search, setSearch, onSearch }) {
  const [searchText, setSearchText] = useState(search || "");

  useEffect(() => {
    if (search !== undefined) {
      setSearchText(search);
    }
  }, [search]);

  function handleChange(event) {
    const value = event.target.value;

    setSearchText(value);

    if (setSearch) {
      setSearch(value);
    }

    if (onSearch) {
      onSearch(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchText);
    }
  }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <span className="search-icon">⌕</span>

      <input
        type="text"
        placeholder="Search places..."
        value={searchText}
        onChange={handleChange}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;