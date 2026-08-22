import { useState } from "react";

function SearchBar({ onSearch }) {

  const [searchText, setSearchText] = useState("");
  function handleChange(event) {
    const newText = event.target.value; 
    setSearchText(newText);             
    onSearch(newText);                  
  }

  return (
    <input
      type="text"
      placeholder="Search places..."
      value={searchText}
      onChange={handleChange}
    />
  );
}

export default SearchBar;