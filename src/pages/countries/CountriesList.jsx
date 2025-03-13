import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryCard from "./CountryCard";
import PaginationControls from "./PaginationControls";
import Navbar from "./Navbar";
import "./countries.css";



const ITEMS_PER_PAGE = 12;
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
  
  // Utility function to paginate countries
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

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries...</p>;
  if (!Array.isArray(data)) return <p>No data found...</p>;

  // Filter and paginate countries
  const filteredCountries = filterCountries(data, searchTerm, selectedContinent);
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const currentCountries = paginateCountries(
    filteredCountries,
    currentPage,
    ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="container-fluid">
      <Navbar
        onSearch={setSearchTerm}
        onContinentSelect={setSelectedContinent}
      />
      <div className="row">
        {currentCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CountriesList;
