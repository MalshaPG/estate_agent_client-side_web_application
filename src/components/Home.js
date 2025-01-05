import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Styles.css";
import Favourites from "./Favourites";
import { useDrag, useDrop } from "react-dnd";

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
}) => {
  const [, drop] = useDrop({
    accept: "FAVOURITE",
    drop: (item) => handleDropFromFavourites(item.property),
  });

  return (
    <Container fluid className="home-container">
      <Row>
        <Col lg={9} xs={20} md={12} className="property-section" ref={drop}>
          <Row xs={1} md={2} lg={3}>
            {properties.map((property) => (
              <Col className="mb-4">
                <DraggableProperty property={property}>
                  <Card key={property.id} className="h-100">
                    <Card.Img
                      variant="top"
                      class="h-40"
                      src={property.picture}
                      alt="property"
                    />
                    <Card.Body>
                      <Card.Title>Type: {property.type}</Card.Title>
                      <Card.Text>
                        <p>Price: {property.price}</p>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <p>Tenure: {property.tenure}</p>
                        <p>Description: {property.description}</p>
                        <p>Location: {property.location}</p>
                        <p>URL: {property.url}</p>
                        <p>
                          Added date: {property.added.month}{" "}
                          {property.added.day} {property.added.year}
                        </p>
                      </Card.Text>

                      <button
                        class="btn btn-primary"
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

        <Col
          lg={3}
          className="favourite-section border border-dark rounded mb-3 bg-light"
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
