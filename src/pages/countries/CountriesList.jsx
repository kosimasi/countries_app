import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import CountryCard from "./CountryCard";
import PaginationControls from "./PaginationControls";
import Navbar from "./Navbar";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import PropTypes from "prop-types";
import "./countries.css";
import axios from "axios";

// Constants
const ITEMS_PER_PAGE = 8;
const API_URL = "https://restcountries.com/v3.1/all";

/**
 * Fetches countries data from the API
 * @returns {Promise<Array>} Array of country objects
 */
const fetchCountries = async () => {
  const response = await axios.get(API_URL);
  if (!response.data) {
    throw new Error(`Failed to fetch countries `);
  }
  return response.data;
};

/**
 * Filters and sorts countries based on search term and selected continent
 * @param {Array} countries - Array of country objects
 * @param {string} searchTerm - Search term for country name
 * @param {string} selectedContinent - Selected continent filter
 * @returns {Array} Filtered and sorted array of countries
 */

const filterCountries = (countries, searchTerm, selectedContinent) => {
  return countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((country) =>
      selectedContinent === "all" ? true : country.region === selectedContinent
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
};

/**
 * Paginates an array of countries
 * @param {Array} countries - Array of country objects
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Array} Paginated array of countries
 */
const paginateCountries = (countries, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return countries.slice(startIndex, endIndex);
};

const usePagination = (initialPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const updatePage = useCallback(
    (page) => {
      setCurrentPage(page);
      setSearchParams({ page });
    },
    [setSearchParams]
  );

  return { currentPage, updatePage };
};

/**
 * Custom hook for keyboard navigation
 */
const useKeyboardNavigation = (currentPage, totalPages, onPageChange) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (event.key === "ArrowRight" && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, onPageChange]);
};

const CountriesList = () => {
  const {
    data: countries = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchParams, setSearchParams] = useSearchParams();
  const [selectedContinent, setSelectedContinent] = useState("all");
  const { currentPage, updatePage } = usePagination(1);

  const filteredCountries = useMemo(
    () => filterCountries(countries, searchTerm, selectedContinent),
    [countries, searchTerm, selectedContinent]
  );

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const currentCountries = useMemo(
    () => paginateCountries(filteredCountries, currentPage, ITEMS_PER_PAGE),
    [filteredCountries, currentPage]
  );

  useKeyboardNavigation(currentPage, totalPages, updatePage);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        updatePage(page);
      }
    },
    [totalPages, updatePage]
  );
  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      setCurrentPage(1);
    },
    [updatePage]
  );

  const handleContinentSelect = useCallback(
    (continent) => {
      setSelectedContinent(continent);
      updatePage(1);
    },
    [updatePage]
  );

  const handlePrevPage = useCallback(
    () => handlePageChange(currentPage - 1),
    [currentPage, handlePageChange]
  );

  const handleNextPage = useCallback(
    () => handlePageChange(currentPage + 1),
    [currentPage, handlePageChange]
  );

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!Array.isArray(countries) || countries.length === 0) {
    return <ErrorMessage message="No countries data available" />;
  }

  return (
    <div className="container-fluid container-holder">
      <Navbar
        onSearch={handleSearch}
        onContinentSelect={handleContinentSelect}
      />
      <div className="row">
        <PaginationArrow
          direction="prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />

        <div className="col-10">
          <div className="row">
            {currentCountries.length > 0 ? (
              currentCountries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4>No countries match your search criteria</h4>
              </div>
            )}
          </div>
        </div>
        <PaginationArrow
          direction="next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <PageIndicator currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

const PaginationArrow = ({ direction, onClick, disabled }) => (
  <div
    className={`col-1 justify-content-${
      direction === "prev" ? "start" : "end"
    } arrow-container`}
  >
    <button
      className="btn arrow-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
    >
       {direction === "prev" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  </div>
);

PaginationArrow.propTypes = {
  direction: PropTypes.oneOf(["prev", "next"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

/**
 * Component for page indicator
 */
const PageIndicator = ({ currentPage, totalPages }) => (
  <p className="text-center mx-2">
    Page {currentPage} of {totalPages}
  </p>
);

PageIndicator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
export default CountriesList;
