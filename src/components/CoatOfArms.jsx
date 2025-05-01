import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Building } from "react-bootstrap-icons";

const CoatOfArms = ({ country, themeMode }) => {
  if (!country.coatOfArms?.png) return null;

  return (
    <Row className="mb-5">
      <Col>
        <Card className={`${themeMode === "dark" ? "dark" : ""}`}>
          <Card.Body>
            <Card.Title className="section-title">
              <Building className="me-2" />
              National Symbols
            </Card.Title>
            <div className="d-flex flex-wrap align-items-center">
              <div className="me-5 mb-3">
                <h6>Coat of Arms</h6>
                <img
                  src={country.coatOfArms.png}
                  alt={`Coat of Arms of ${country.name.common}`}
                  className="coat-of-arms"
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CoatOfArms;