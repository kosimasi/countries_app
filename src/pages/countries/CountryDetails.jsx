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
        Error loading country details. Please try again later.
      </Alert>
    );

  if (!data || data.length === 0)
    return (
      <Alert variant="warning" className="mt-4">
        No data found for this country.
      </Alert>
    );

  const country = data[0];

  return (
    <Container className="mt-4 ">
      <Row className="justify-content-center ">
        <Col md={8}>
          <Card className="shadow">
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
              <Row>
                <Col md={6}>
                  <Card.Text>
                    <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Population:</strong>{" "}
                    {country.population.toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Region:</strong> {country.region}
                  </Card.Text>
                  <Card.Text>
                    <strong>Subregion:</strong> {country.subregion}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text>
                    <strong>Languages:</strong>{" "}
                    {Object.values(country.languages).join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Currencies:</strong>{" "}
                    {Object.values(country.currencies)
                      .map((currency) => currency.name)
                      .join(", ")}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CountryDetails;