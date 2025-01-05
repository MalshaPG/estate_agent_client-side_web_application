import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

const SearchBar = ({ handleSearchTerm }) => {
  return (
    <div className="bg mb-4">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search properties..."
          onChange={(e) => handleSearchTerm(e.target.value)}
          className="form-control mb-2 "
        />

        <div>
          <Link to="/AdvancedSearch" className="btn btn-link">
            Advanced Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
