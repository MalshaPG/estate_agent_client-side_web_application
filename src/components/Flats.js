import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Styles.css";

//Functional component to display flats
const Flats = ({ properties }) => {
  return (
    <Container>
      <h1>Flats</h1>
      {/*Different column sizes for different screen sizes */}
      <Row xs={6} md={8} className="mt-4">
        {/* Iterate over the properties array to filter and display flats */}
        {properties?.map((property) => {
          //Check if the property type is flat
          if (property.type === "Flat") {
            return (
              <Col lg={4} md={4} xs={6} className="mb-4">
                {/* Crad component to display property details */}
                <Card key={property.id} className="h-100 mt-2">
                  <img
                    class="card-img-top"
                    src={property.picture}
                    alt="property"
                  />
                  <div class="card-body">
                    <p>Type: {property.type}</p>
                    <p>Price: {property.price}</p>
                    <p>Bedrooms: {property.bedrooms}</p>
                    <p>Tenure: {property.tenure}</p>
                    <p>Location: {property.location}</p>
                    <p>
                      Added date: {property.added.month} {property.added.day}{" "}
                      {property.added.year}
                    </p>
                  </div>
                </Card>
              </Col>
            );
          }
          //Return null if the property type is not flat
          return null;
        })}
      </Row>
    </Container>
  );
};

export default Flats;
