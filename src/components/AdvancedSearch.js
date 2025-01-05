import React, { useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import { Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function AdvancedSearch({ onSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    type: "any",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    dateAdded: null,
    postCodeArea: "",
  });

  const handleInputChange = (name, value) => {
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="container border border-2 p-3">
        <h1 className="pb-3 border-bottom">Advanced Search</h1>
        <div className="container mt-3">
          <Row className="mb-4 align-items-center">
            <Col lg={6}>
              <p>Property type:</p>
              <DropdownList
                value={searchCriteria.type}
                onChange={(value) => handleInputChange("type", value)}
                data={["any", "House", "Flat"]}
                className="w-100"
              />
            </Col>

            <Col lg={6}>
              <label className="form-label fw-bold">No. of Bedrooms: </label>
              <NumberPicker
                value={searchCriteria.bedrooms}
                onChange={(value) => handleInputChange("bedrooms", value)}
                min={0}
                max={10}
                className="w-100"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <label className="form-label fw-bold">Price Range: </label>
              <div className="d-flex align-items-center">
                <NumberPicker
                  value={searchCriteria.minPrice}
                  onChange={(value) => handleInputChange("minPrice", value)}
                  min={0}
                  max={1000000}
                  step={1000}
                  className="w-50 me-2"
                  placeholder="Min"
                />
                <NumberPicker
                  value={searchCriteria.maxPrice}
                  onChange={(value) => handleInputChange("maxPrice", value)}
                  min={0}
                  max={1000000}
                  step={1000}
                  className="w-50"
                  placeholder="Max"
                />
              </div>
            </Col>

            <Col lg={6}>
              <label className="form-label fw-bold">Date Added: </label>
              <DatePicker
                value={searchCriteria.dateAdded}
                onChange={(value) => handleInputChange("dateAdded", value)}
                valueFormat={{ dateStyle: "medium" }}
                className="w-100"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <label className="form-label fw-bold">Post Code/Area: </label>
              <input
                type="text"
                id="PostCodeArea"
                name="PostCodeArea"
                value={searchCriteria.postCodeArea}
                onChange={(e) =>
                  handleInputChange("postCodeArea", e.target.value)
                }
                className="form-control"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Button type="submit" className="btn btn-primary">
                Search
              </Button>
              <p>
                (Please click search button first and then click the below
                button to see the result)
              </p>

              <Link to="/" className="bg-primary p-2 rounded text-white">
                See the result
              </Link>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}
