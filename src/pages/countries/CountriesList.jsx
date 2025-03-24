import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import CountryCard from "./CountryCard";
import PaginationControls from "./PaginationControls";
import Navbar from "./Navbar";
import "./countries.css";

const ITEMS_PER_PAGE = 8;

const fetchCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
};

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

const paginateCountries = (countries, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return countries.slice(startIndex, endIndex);
};

const CountriesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });


    const [searchParams, setSearchParams] = useSearchParams(); 
  const initialPage = parseInt(searchParams.get("page")) || 1; 

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");

    useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Ensure search results always start on page 1
  };

  const filteredCountries = data
    ? filterCountries(data, searchTerm, selectedContinent)
    : [];
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const currentCountries = paginateCountries(
    filteredCountries,
    currentPage,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      } else if (event.key === "ArrowRight") {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries...</p>;
  if (!Array.isArray(data)) return <p>No data found...</p>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container-fluid container-holder">
      <Navbar
        onSearch={handleSearch}
        onContinentSelect={setSelectedContinent}
      />
      <div className="row">

        <div className="col-1 justify-content-start arrow-container">
          <button
            className="btn  arrow-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </div>

        <div className="col-10">
          <div className="row">
            {currentCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        </div>

        <div className="col-1 arrow-container">
          <button
            className="btn arrow-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <p className="text-center mx-2">Page {currentPage} of {totalPages}</p>
    </div>
  );
};

export default CountriesList;

