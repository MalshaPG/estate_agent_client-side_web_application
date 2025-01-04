import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

export default function SearchBar() {
  return (
    <div className="bg">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search properties..."
          // onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn btn-primary mx-2 mb-2 button">Sale</button>
        <button className="btn btn-primary mx-2 mb-2 button">Rent</button>
        <br />
        {/* <button class="btn btn-primary mx-2 mt-2" type="submit">
          Search
        </button> */}

        <div>
          <Link to="/AdvancedSearch">Advanced Search</Link>
        </div>
      </div>
    </div>
  );
}
