import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Styles.css";

const Houses = ({ properties }) => {
  return (
    <Container>
      <h1>Houses</h1>
      <Row xs={6} md={8} className="mt-4">
        {/* Iterate over all the properties to filter and dispaly Houses */}
        {properties?.map((property) => {
          if (property.type === "House") {
            return (
              <Col
                lg={6}
                md={6}
                xs={6}
                className="mb-4 d-flex align-items-center"
              >
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
          return null;
        })}
      </Row>
    </Container>
  );
};

export default Houses;
