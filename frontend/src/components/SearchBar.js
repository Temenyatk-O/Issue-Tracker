import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, onAdd }) => (
  <div className="search-bar">
    <div className="search-wrap">
      {/* Unicode magnifier icon — swap for an SVG if needed */}
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search issues..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    <button className="btn-add" onClick={onAdd}>+ New Issue</button>
  </div>
);

export default SearchBar;
