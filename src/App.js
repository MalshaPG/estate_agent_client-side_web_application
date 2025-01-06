import "./App.css";
import Nav from "./components/Nav";
import Flats from "./components/Flats";
import Houses from "./components/Houses";
import Home from "./components/Home";
import AdvancedSearch from "./components/AdvancedSearch";
import Footer from "./components/Footer";
import PropertyDetails from "./components/PropertyDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  //State variables for managing properties, favourites and search
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearchTerm] = useState("");

  //Fetch properties from the properties.json file and set the state
  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      //If an error occurs, log it to the console
      .catch((error) => console.error("Error fetching data", error));

    // Load favourites from local storage
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  //Add property to the favourites it only it is not already in the favourites
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

  //Remove item from favourites by dragging it out
  const handleDropFromFavourites = (property) => {
    handleRemoveFromFavourites(property.id);
  };

  //Handle advanced search using multiple search criteria
  const handleSearch = (searchCriteria) => {
    const filtered = properties.filter((property) => {
      // Check if the property type matches
      const typeMatch =
        searchCriteria.type === "any" ||
        property.type.toLowerCase() === searchCriteria.type.toLowerCase();

      // Check if the price is within the specified range
      const priceMatch =
        (!searchCriteria.minPrice ||
          property.price >= Number(searchCriteria.minPrice)) &&
        (!searchCriteria.maxPrice ||
          property.price <= Number(searchCriteria.maxPrice));

      // Check if the number of bedrooms is within the specified range
      const bedroomsMatch =
        (!searchCriteria.minBedrooms ||
          property.bedrooms >= Number(searchCriteria.minBedrooms)) &&
        (!searchCriteria.maxBedrooms ||
          property.bedrooms <= Number(searchCriteria.maxBedrooms));

      // Check if the date added is within the specified range
      const propertyDate = new Date(
        property.added.year,
        property.added.month - 1,
        property.added.day
      );
      const dateAddedMatch =
        (!searchCriteria.startDate ||
          propertyDate >= searchCriteria.startDate) &&
        (!searchCriteria.endDate || propertyDate <= searchCriteria.endDate);

      // Check if the postcode area matches
      const postcodeMatch =
        !searchCriteria.postCodeArea ||
        property.location
          .toLowerCase()
          .includes(searchCriteria.postCodeArea.toLowerCase());

      // Return true if all criteria match
      return (
        typeMatch &&
        priceMatch &&
        bedroomsMatch &&
        dateAddedMatch &&
        postcodeMatch
      );
    });

    setFilteredProperties(filtered);
  };

  //Search items in the search bar using one term
  const handleSearchTerm = (term) => {
    setSearchTerm(term);
    const filtered = properties.filter((property) =>
      Object.values(property).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredProperties(filtered);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <div>
            <Nav classNam="nav" />
          </div>

          <div className="container">
            <br />

            <div className="content">
              <Routes>
                {/* Define route for different pages */}
                <Route
                  exact
                  path="/"
                  element={
                    <Home
                      properties={filteredProperties}
                      favourites={favourites}
                      handleSearchTerm={handleSearchTerm}
                      handleAddToFavourites={handleAddToFavourites}
                      handleRemoveFromFavourites={handleRemoveFromFavourites}
                      handleClearFavourites={handleClearFavourites}
                      handleDropFromFavourites={handleDropFromFavourites}
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
                  element={<AdvancedSearch onSearch={handleSearch} />}
                />

                <Route
                  path="/property/:id"
                  element={<PropertyDetails properties={properties} />}
                />
              </Routes>
            </div>
          </div>
          <Footer className="footer" />
        </div>
      </Router>
    </DndProvider>
  );
};

export default App;
