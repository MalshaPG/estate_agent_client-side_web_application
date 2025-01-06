import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Styles.css";
import Favourites from "./Favourites";
import { useDrag, useDrop } from "react-dnd";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

//Component for draggable property
const DraggableProperty = ({ property, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PROPERTY",
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

const Home = ({
  properties,
  favourites,
  handleAddToFavourites,
  handleRemoveFromFavourites,
  handleClearFavourites,
  handleDropFromFavourites,
  handleSearchTerm,
}) => {
  //Set up drop target for removing properties from favourites
  const [, drop] = useDrop({
    accept: "FAVOURITE",
    drop: (item) => handleDropFromFavourites(item.property),
  });

  return (
    <Container fluid className="home-container">
      {/* Search bar component */}
      <SearchBar handleSearchTerm={handleSearchTerm} className="mb-5" />

      <Row>
        {/* Property listing section */}
        <Col lg={9} xs={12} className="property-section h-100" ref={drop}>
          <Row xs={1} lg={3} className="g-4">
            {/* Loop through properties and display each one */}
            {properties.map((property) => (
              <Col className="mb-4">
                <DraggableProperty property={property}>
                  {/* Crad componet for each item in the properties list */}
                  <Card key={property.id} className="h-100 d-flex flex-column">
                    <Card.Img
                      variant="top"
                      className="h-40 homeCardImage"
                      style={{ height: "200px", objectFit: "cover" }}
                      src={property.picture}
                      alt="property"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>Type: {property.type}</Card.Title>
                      <Card.Text>
                        <p>Price: {property.price}</p>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <p>Location: {property.location}</p>
                        <p>
                          Added date: {property.added.month}{" "}
                          {property.added.day} {property.added.year}
                        </p>
                        <Link to={`/property/${property.id}`}>
                          More Details
                        </Link>
                      </Card.Text>

                      {/* Button to add properties to favourites */}
                      <button
                        class="btn btn-primary mt-auto"
                        onClick={() => handleAddToFavourites(property)}
                      >
                        Add to favourites
                      </button>
                    </Card.Body>
                  </Card>
                </DraggableProperty>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Favourites Section */}
        <Col
          lg={3}
          xs={12}
          className="favourite-section border border-2 border-dark rounded mb-3 bg-light"
        >
          <div className="favourite-container">
            <Favourites
              favourites={favourites}
              handleRemoveFromFavourites={handleRemoveFromFavourites}
              handleClearFavourites={handleClearFavourites}
              handleAddToFavourites={handleAddToFavourites}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
