import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Flats from "./components/Flats";
import Houses from "./components/Houses";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";
import AdvancedSearch from "./components/AdvancedSearch";
import React, { useState, useEffect } from "react";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => setProperties(data.properties))
      .catch((error) => console.error("Error fetching data", error));

    // Load favourites from local storage
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  //Add property to thefavourites it only it is not already in the favourites
  const handleAddToFavourites = (property) => {
    const isAlreadyFavourite = favourites.some((fav) => fav.id === property.id);
    if (!isAlreadyFavourite) {
      const updatedFavourites = [...favourites, property];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    } else {
      alert("This property is already in your favourites");
    }
  };

  // Remove single property from favourites in the local storage
  const handleRemoveFromFavourites = (propertyId) => {
    const updatedFavourites = favourites.filter(
      (property) => property.id !== propertyId
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  // Clear all favourites from the local storage
  const handleClearFavourites = () => {
    setFavourites([]);
    localStorage.removeItem("favourites");
  };

  return (
    <Router>
      <div className="App">
        <div>
          <Nav />
        </div>

        <div className="container">
          <br />
          <div>
            <SearchBar />
          </div>

          <br />

          <div className="content">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    properties={properties}
                    favourites={favourites}
                    handleAddToFavourites={handleAddToFavourites}
                    handleRemoveFromFavourites={handleRemoveFromFavourites}
                    handleClearFavourites={handleClearFavourites}
                  />
                }
              />
              <Route
                exact
                path="/Houses"
                element={<Houses properties={properties} />}
              />
              <Route
                exact
                path="/Flats"
                element={<Flats properties={properties} />}
              />

              <Route
                exact
                path="/AdvancedSearch"
                element={<AdvancedSearch />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
