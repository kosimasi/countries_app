import React from "react";
import { Card, ListGroup,Row,Col } from "react-bootstrap";
import { CurrencyExchange } from "react-bootstrap-icons";
import { getCountryDetails } from "./utils/utils";

const EconomyTab = ({ country, themeMode }) => {
  const { currencies } = getCountryDetails(country);

  return (
    <Row className="mt-4">
      <Col>
        <Card className={`mb-4 ${themeMode === "dark" ? "dark" : ""}`}>
          <Card.Body>
            <Card.Title className="section-title">
              <CurrencyExchange className="me-2" />
              Economic Information
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className={themeMode === "dark" ? "text-light" : ""}>
                <strong>Currencies:</strong> {currencies.join(", ")}
              </ListGroup.Item>
              {country.gini && (
                <ListGroup.Item>
                  <strong>Gini Index:</strong>{" "}
                  {Object.values(country.gini)[0]}%
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EconomyTab;