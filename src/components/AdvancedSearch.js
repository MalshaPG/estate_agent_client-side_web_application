import React, { useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import { Row, Col, Button } from "react-bootstrap";
import "react-widgets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import { DatePicker } from "react-widgets/cjs";

export default function AdvancedSearch({ onSearch }) {
  const navigate = useNavigate();

  //State to store search criterias
  const [searchCriteria, setSearchCriteria] = useState({
    type: "any",
    minBedrooms: "",
    maxBedrooms: "",
    minPrice: "",
    maxPrice: "",
    startDate: null,
    endDate: null,
    postCodeArea: "",
  });

  //Handle input changes in search critierias
  const handleInputChange = (name, value) => {
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  //Handle the submission of the form
  //1.Search for the result
  //2.Navigate to Home page and diplay the result
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="border border-2 rounded p-4 shadow-sm bg-light"
      >
        <h1 className="pb-3 border-bottom text-primary">Advanced Search</h1>
        <div className="mt-3">
          {/* Row 1: Property Type & Bedrooms */}
          <Row className="mb-4 align-items-center">
            {/* In Larger spans 6 grid spaces and on extra-smaller screens, 12 grid spaces (full width) */}
            <Col lg={6} xs={12}>
              <label className="form-label fw-bold">Property Type:</label>
              <DropdownList
                value={searchCriteria.type}
                onChange={(value) => handleInputChange("type", value)}
                data={["any", "House", "Flat"]}
                className="w-100"
              />
            </Col>

            <Col lg={6} xs={12}>
              <label className="form-label fw-bold">Bedrooms:</label>
              <div className="d-flex justify-content-center">
                <div className="d-flex">
                  <input
                    type="number"
                    value={searchCriteria.minBedrooms}
                    onChange={(e) =>
                      handleInputChange(
                        "minBedrooms",
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    min={1}
                    max={10}
                    placeholder="Min"
                    className="form-control w-50 me-2"
                  />

                  <input
                    type="number"
                    value={searchCriteria.maxBedrooms}
                    onChange={(e) =>
                      handleInputChange(
                        "maxBedrooms",
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    min={1}
                    max={10}
                    placeholder="Max"
                    className="form-control w-50 me-2"
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* Row 2: Price Range */}
          <Row className="mb-4">
            <Col lg={6} xs={12}>
              <label className="form-label fw-bold">Price Range:</label>
              <div className="d-flex">
                <input
                  type="number"
                  value={searchCriteria.minPrice}
                  onChange={(e) =>
                    handleInputChange(
                      "minPrice",
                      parseInt(e.target.value, 10) || 100000
                    )
                  }
                  min={100000}
                  max={1000000}
                  step={1000}
                  placeholder="Min"
                  className="form-control w-50 me-2"
                />

                <input
                  type="number"
                  value={searchCriteria.maxPrice}
                  onChange={(e) =>
                    handleInputChange(
                      "maxPrice",
                      parseInt(e.target.value, 10) || 100000
                    )
                  }
                  min={100000}
                  max={1000000}
                  step={1000}
                  placeholder="Max"
                  className="form-control w-50"
                />
              </div>
            </Col>
          </Row>

          {/* Row 3: Date Range */}
          <Row className="mb-4">
            <Col lg={6} xs={12}>
              <label className="form-label fw-bold">Start Date:</label>
              <DatePicker
                value={searchCriteria.startDate}
                onChange={(value) => handleInputChange("startDate", value)}
                className="w-100"
              />
            </Col>

            <Col lg={6} xs={12}>
              <label className="form-label fw-bold">End Date:</label>
              <DatePicker
                value={searchCriteria.endDate}
                onChange={(value) => handleInputChange("endDate", value)}
                className="w-100"
              />
            </Col>
          </Row>

          {/* Row 4: Post Code/Area */}
          <Row className="mb-4">
            <Col xs={12}>
              <label className="form-label fw-bold">Post Code/Area:</label>
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

          {/*Submit buttons */}
          <Row>
            <Col xs={12}>
              <Button type="submit" className="btn btn-primary">
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}
