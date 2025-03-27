import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  ListGroup,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  Globe,
  GeoAlt,
  People,
  CurrencyExchange,
  ChatLeftText,
  Building,
  BorderAll,
  ArrowLeft,
} from "react-bootstrap-icons";
import "./CountryDetails.css";

const fetchCountryDetails = async (cca3) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
  return response.json();
};

const CountryDetails = () => {
  const { cca3 } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["country", cca3],
    queryFn: () => fetchCountryDetails(cca3),
  });

  if (isLoading)
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading country details...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-screen">
        <Alert variant="danger" className="mt-4">
          <h4> ❌ Error loading country details. Please try again later.</h4>
          <p>Please try again later or check your internet connection.</p>
        </Alert>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="not-found-screen">
        <Alert variant="warning" className="mt-4">
          <h4>⚠️ Country not found</h4>
          <p>The requested country data is not available.</p>
          //{" "}
        </Alert>
      </div>
    );
  const country = data[0];
  const officialName = country.name.official;
  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].official
    : officialName;
  const currencies = country.currencies
    ? Object.values(country.currencies).map(
        (c) => `${c.name} (${c.symbol || "—"})`
      )
    : ["N/A"];
  const languages = country.languages
    ? Object.values(country.languages)
    : ["N/A"];
  const timezones = country.timezones || ["N/A"];
  const drivingSide = country.car?.side || "N/A";
  const unMember = country.unMember ? "Yes" : "No";

  return (
    <Container fluid className="country-details-container">
      <Row className="mb-4">
        <Col>
          <a href="/" className="back-button">
            <ArrowLeft size={20} className="me-2" />
            Back to Countries
          </a>
        </Col>
      </Row>

      <Row className="country-header mb-5">
        <Col>
          <div className="d-flex align-items-center">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="country-flag me-4"
            />
            <div>
              <h1 className="country-title">{country.name.common}</h1>
              <p className="country-subtitle">{officialName}</p>
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

      <Row className="mb-5">
        <Col>
          <Tabs defaultActiveKey="overview" id="country-tabs" className="mb-4">
            <Tab eventKey="overview" title="Overview">
              <Row className="mt-4">
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title className="section-title">
                        <GeoAlt className="me-2" />
                        Geographic Information
                      </Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Capital:</strong>{" "}
                          {country.capital?.[0] || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Continent:</strong> {country.region || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Subregion:</strong>{" "}
                          {country.subregion || "N/A"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Area:</strong>{" "}
                          {country.area?.toLocaleString() || "N/A"} km²
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Timezones:</strong> {timezones.join(", ")}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title className="section-title">
                        <People className="me-2" />
                        Demographic Information
                      </Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
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
            </Tab>

            <Tab eventKey="economy" title="Economy">
              <Row className="mt-4">
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="section-title">
                        <CurrencyExchange className="me-2" />
                        Economic Information
                      </Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
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
            </Tab>

            <Tab eventKey="maps" title="Maps">
              <Row className="mt-4">
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="section-title">
                        <Globe className="me-2" />
                        Location Information
                      </Card.Title>
                      {country.latlng && (
                        <div className="mb-3">
                          <strong>Coordinates:</strong>{" "}
                          {country.latlng.join(", ")}
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
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {country.coatOfArms?.png && (
        <Row className="mb-5">
          <Col>
            <Card>
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
      )}
    </Container>
  );
};

export default CountryDetails;
