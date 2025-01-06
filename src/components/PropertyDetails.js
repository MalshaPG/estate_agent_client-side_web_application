import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Styles.css";
import DOMPurify from "dompurify";

const PropertyDetails = ({ properties }) => {
  // Function to sanitize the location string for URL encoding
  const sanitize = (str) => encodeURIComponent(str);

  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [index, setIndex] = useState(0);

  if (!property) {
    return <div>Property not found</div>;
  }

  // Sanitize the property.description to prevent XSS attacks
  const sanitizedDescription = DOMPurify.sanitize(property.description);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid className="mt-4 property-details-container">
      <h1 className="mb-4 text-center text-sm-start a d-flex justify-content-center">
        {property.type} in {property.location}
      </h1>
      <Row className="d-flex justify-content-center">
        {/* Image carousel */}
        <Col md={4} xs={12}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Image
                src={property.picture}
                alt={property.type}
                fluid
                width={"70%"}
                height={"60%"}
              />
            </Carousel.Item>
            {property.images &&
              property.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <Image
                    src={img}
                    alt={`Property image ${idx + 1}`}
                    fluid
                    rounded
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>

        {/* Property info */}
        <Col md={4} xs={12} className="mt-4 property-info">
          <h2>Rs.{property.price}</h2>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.tenure}</p>
          <p>{property.location}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {/* Tabs to display long description, floor plan and the map */}
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>
            <TabPanel>
              <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            </TabPanel>
            <TabPanel>
              <Image
                src={property.floorPlan}
                alt="Floor Plan"
                fluid
                width={"50%"}
              />
            </TabPanel>
            <TabPanel>
              <iframe
                title="Google Map"
                width="100%"
                height="450"
                style={{ border: 0 }}
                // Dynamically generates the map based on the sanitized property location
                src={`https://www.google.com/maps?q=${sanitize(
                  property.location
                )}&output=embed`}
                allowFullScreen
              ></iframe>
            </TabPanel>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
