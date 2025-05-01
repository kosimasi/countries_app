import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { GeoAlt, People } from "react-bootstrap-icons";
import { getCountryDetails } from "./utils/utils";

const OverviewTab = ({ country, themeMode }) => {
  const { nativeNames, languages, timezones, drivingSide, unMember } =
    getCountryDetails(country);

  return (
    <Row className="mt-4">
      <Col md={6}>
        <Card className={`mb-4 ${themeMode === "dark" ? "dark" : ""}`}>
          <Card.Body>
            <Card.Title className="section-title">
              <GeoAlt className="me-2" />
              Geographic Information
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className={themeMode === "dark" ? "text-light" : ""}>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Continent:</strong> {country.region || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Subregion:</strong> {country.subregion || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Area:</strong> {country.area?.toLocaleString() || "N/A"} km²
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Timezones:</strong> {timezones.join(", ")}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className={`mb-4 ${themeMode === "dark" ? "dark" : ""}`}>
          <Card.Body>
            <Card.Title className="section-title">
              <People className="me-2" />
              Demographic Information
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className={themeMode === "dark" ? "text-light" : ""}>
                <strong>Population:</strong>{" "}
                {country.population?.toLocaleString() || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Languages:</strong> {languages.join(", ")}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Native Name:</strong> {nativeNames}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Driving Side:</strong> {drivingSide}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>UN Member:</strong> {unMember}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OverviewTab;