import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Styles.css";
import Favourites from "./Favourites";

const Home = ({
  properties,
  favourites,
  handleAddToFavourites,
  handleRemoveFromFavourites,
  handleClearFavourites,
}) => {
  return (
    <Container fluid className="home-container">
      <Row>
        <Col lg={9} xs={20} md={12} className="property-section">
          <Row xs={1} md={2} lg={3}>
            {properties.map((property) => (
              <Col className="mb-4">
                <Card key={property.id} className="h-100">
                  <img
                    class="card-img-top h-40"
                    src={property.picture}
                    alt="property"
                  />
                  <div class="card-body">
                    <p>Type: {property.type}</p>
                    <p>Price: {property.price}</p>
                    <p>Bedrooms: {property.bedrooms}</p>
                    <p>Tenure: {property.tenure}</p>
                    <p>Description: {property.description}</p>
                    <p>Location: {property.location}</p>
                    <p>URL: {property.url}</p>
                    <p>
                      Added date: {property.added.month} {property.added.day}{" "}
                      {property.added.year}
                    </p>

                    <button
                      class="btn btn-primary"
                      onClick={() => handleAddToFavourites(property)}
                    >
                      Add to favourite
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col
          lg={3}
          className="favourite-section border border-dark rounded mb-3 bg-light"
        >
          <div className="favourite-container">
            <Favourites
              favourites={favourites}
              handleRemoveFromFavourites={handleRemoveFromFavourites}
              handleClearFavourites={handleClearFavourites}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
