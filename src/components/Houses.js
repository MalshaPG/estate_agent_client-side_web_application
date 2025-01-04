import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Styles.css";

const Houses = ({ properties }) => {
  return (
    <div>
      <h1>Houses</h1>
      <Row>
        {properties?.map((property) => {
          if (property.type === "House") {
            return (
              <Col lg={3} md={2} xs={1} className="mb-4">
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
                    <p>Description: {property.description}</p>
                    <p>Location: {property.location}</p>
                    <p>URL: {property.url}</p>
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
    </div>
  );
};

export default Houses;
