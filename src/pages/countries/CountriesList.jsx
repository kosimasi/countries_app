import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PaginationControls from "../../components/PaginationControls";
import { fetchCountries } from "../../components/utils/api";
import {
  filterCountries,
  paginateCountries,
} from "../../components/utils/filters";
import usePagination from "../../components/hooks/UsePagination";
import useKeyboardNavigation from "../../components/hooks/UseKeyboardNavigation";
import PaginationArrow from "../../components/PaginationArrow";
import PageIndicator from "../../components/PageIndictor";
import CountriesGrid from "../../components/CountriesGrid";

import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../../features/theme/ThemeSlice";
import "./countries.css";
import axios from "axios";

// Constants
const ITEMS_PER_PAGE = 8;
const API_URL = "https://restcountries.com/v3.1/all";


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
  const [selectedContinent, setSelectedContinent] = useState("all");
  const { currentPage, updatePage } = usePagination(1);
  const themeMode = useSelector(selectThemeMode);

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
      updatePage(1);
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
    <div
      className={` container-fluid container-holder p-0 ${
        themeMode === "dark" ? "dark" : ""
      }`}
    >
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

        <CountriesGrid countries={currentCountries} />

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
export default CountriesList;
