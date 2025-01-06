import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./Styles.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr />
      <footer className="text-center">
        <Row>
          {/*Link to the home page */}
          <Col lg={4} md={4} sm={12} xs={12}>
            <Link to="/" className="text-decoration-none">
              <img src="/images/logo.svg" alt="logo" className="logo" />
              <p className="fs-5">Right move</p>
              <p className="fs-6">Find your dream home</p>
            </Link>
          </Col>

          {/* Contact Info */}
          <Col lg={4} md={4} sm={12} xs={12}>
            <p className="fs-5">Contact us</p>
            <p className="fs-6">Phone: 1234567890</p>
            <p className="fs-6">Email: 123@gmail.com</p>
          </Col>

          {/* Follow us */}
          <Col lg={4} md={4} sm={12} xs={12}>
            <p className="fs-5">Follow us</p>
            <Button href="#" className="btn btn-link">
              <p>Facebook</p>
            </Button>
            <br />
            <Button href="#" className="btn btn-link">
              <p>Instagram</p>
            </Button>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default Footer;
