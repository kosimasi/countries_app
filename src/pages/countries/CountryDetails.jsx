import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
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
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="mt-4">
        ❌ Error loading country details. Please try again later.
      </Alert>
    );

  if (!data || data.length === 0)
    return (
      <Alert variant="warning" className="mt-4">
        ⚠️ No data found for this country.
      </Alert>
    );

  const country = data[0];

  return (
    <Container className="country-container">
      <Row className="justify-content-center w-100">
        <Col md={8} sm={10} lg={6}>
          <Card className="shadow ">
            <Card.Img
              variant="top"
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="flag-image"
            />
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {country.name.common}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="country-details">
          <Row className="detail-row">
            🌍 <strong>Region:</strong> {country.region || "N/A"}
          </Row>
          <Row className="detail-row">
            🏙️ <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </Row>
          <Row className="detail-row">
            🗺️ <strong>Subregion:</strong> {country.subregion || "N/A"}
          </Row>
          <Row className="detail-row">
            🗣️ <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </Row>
          <Row className="detail-row">
            💰 <strong>Currencies:</strong>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ")
              : "N/A"}
          </Row>
          <Row className="detail-row">
            👥 <strong>Population:</strong>{" "}
            {country.population?.toLocaleString() || "N/A"}
          </Row>
          <Row className="detail-row">
            🛂 <strong>Border Countries:</strong>{" "}
            {country.borders ? country.borders.join(", ") : "None"}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CountryDetails;
