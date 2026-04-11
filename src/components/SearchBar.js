import React from "react";
import "../styles/SearchBar.css";
//A component that renders the header of the page with search bar and add task btn
const SearchBar = ({ searchTerm, onSearchChange, onAddTask }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <button className="add-task-btn" onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
};

export default SearchBar;
