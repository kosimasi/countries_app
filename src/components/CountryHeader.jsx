import React from "react";
import { Row, Col, Badge } from "react-bootstrap";

const CountryHeader = ({ country, themeMode }) => {
  return (
    <Row
      className={`country-header mb-5 
      ${themeMode === "dark" ? "dark" : ""}`}
    >
      <Col>
        <div className="d-flex align-items-center">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="country-flag me-4"
          />
          <div>
            <h1
              className={`country-title 
              ${themeMode === "dark" ? "text-light" : ""}`}
            >
              {country.name.common}
            </h1>
            <p
              className={`country-subtitle ${
                themeMode === "dark" ? "text-light" : ""
              }`}
            >
              {country.name.official}
            </p>
            <div className="country-badges">
              <Badge bg="primary" className="me-2">
                {country.region}
              </Badge>
              {country.subregion && (
                <Badge bg="secondary" className="me-2">
                  {country.subregion}
                </Badge>
              )}
              {country.unMember && <Badge bg="success">UN Member</Badge>}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CountryHeader;