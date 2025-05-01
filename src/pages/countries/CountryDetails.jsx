import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../../features/theme/ThemeSlice";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { fetchCountryDetails } from "../../components/utils";
import LoadingErrorHandlers from "../../components/LoadingErrorHandlers";
import CountryHeader from "../../components/CountryHeader";
import CountryTabs from "../../components/CountryTabs";
import CoatOfArms from "../../components/CoatOfArms";
import "./CountryDetails.css";

/**
 * Fetches country details from REST Countries API
 * @param {string} cca3 - The 3-letter country code to fetch details for
 * @returns {Promise<object>} Promise resolving to country data
 */

// const fetchCountryDetails = async (cca3) => {
//   const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
//   return response.json();
// };

/**
 * CountryDetails component displays comprehensive information about a specific country
 * Fetches data from REST Countries API and presents it in an organized layout with tabs
 */

const CountryDetails = () => {
  const { cca3 } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["country", cca3],
    queryFn: () => fetchCountryDetails(cca3),
  });
  const themeMode = useSelector(selectThemeMode);
  const loadingOrError = LoadingErrorHandlers({ isLoading, error, data });
  if (loadingOrError) return loadingOrError;
  const country = data[0];

  return (
    <Container
      fluid
      className={`country-details-container 
    ${themeMode === "dark" ? "dark" : ""}`}
    >
      <Row className="mb-4">
        <Col>
          <a
            href="/"
            className={`back-button ${themeMode === "dark" ? "dark" : ""}`}
          >
            <ArrowLeft size={20} className="me-2" />
            Back to Countries
          </a>
        </Col>
      </Row>

      <CountryHeader country={country} themeMode={themeMode} />
      <CountryTabs country={country} themeMode={themeMode} />
      <CoatOfArms country={country} themeMode={themeMode} />
    </Container>
  );
};

export default CountryDetails;
