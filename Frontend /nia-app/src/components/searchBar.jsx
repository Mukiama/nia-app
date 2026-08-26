import { useEffect, useState } from "react";
import "../styles/filter.css"
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
      {/* <span className="search-icon">⌕</span> */}
      
    <div className="search-cont">
      <input
      className="search-input"
        type="text"
        placeholder="Search places..."
        value={searchText}
        onChange={handleChange}
      />

      <button 
      className="search-btn"
      type="submit">
        
        Search
      </button>

      
    </div>
      
    </form>
  );
}

export default SearchBar;