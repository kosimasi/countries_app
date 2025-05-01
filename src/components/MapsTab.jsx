import React from "react";
import { Card, Badge ,Row,Col} from "react-bootstrap";
import { Globe, BorderAll } from "react-bootstrap-icons";

const MapsTab = ({ country, themeMode }) => {
  return (
    <Row className="mt-4">
      <Col>
        <Card className={`${themeMode === "dark" ? "dark" : ""}`}>
          <Card.Body>
            <Card.Title className="section-title">
              <Globe className="me-2" />
              Location Information
            </Card.Title>
            {country.latlng && (
              <div className="mb-3">
                <strong>Coordinates:</strong> {country.latlng.join(", ")}
              </div>
            )}
            {country.maps?.googleMaps && (
              <div className="mb-3">
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary me-2"
                >
                  View on Google Maps
                </a>
                {country.maps.openStreetMaps && (
                  <a
                    href={country.maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary"
                  >
                    View on OpenStreetMap
                  </a>
                )}
              </div>
            )}
            {country.borders && country.borders.length > 0 ? (
              <div>
                <h5 className="mb-3">
                  <BorderAll className="me-2" />
                  Border Countries
                </h5>
                <div className="border-countries">
                  {country.borders.map((border) => (
                    <Badge
                      key={border}
                      bg="light"
                      text="dark"
                      className="me-2 mb-2"
                    >
                      {border}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div>No land borders</div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MapsTab;