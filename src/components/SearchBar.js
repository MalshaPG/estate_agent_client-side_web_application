import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

const SearchBar = ({ handleSearchTerm }) => {
  return (
    <div className="bg mb-4">
      <div className="searchBar">
        {/* Imput for search term */}
        <input
          type="text"
          placeholder="Search properties using one word..."
          onChange={(e) => handleSearchTerm(e.target.value)}
          className="form-control mb-2 "
        />

        {/* Link to advanced search */}
        <div>
          <Link to="/AdvancedSearch" className="btn btn-link">
            <p className="AdvancedSearch">Advanced Search</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
