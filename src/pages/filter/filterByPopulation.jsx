import React, { useEffect, useState } from "react";
import { fetchCountries } from "../../components/utils/api";
import { useParams } from "react-router-dom";
import PaginationControls from "../../components/PaginationControls";
import "./FilterByPopulation.css"; 


const FilterByPopulation = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { filterType } = useParams();

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();

        let filteredCountries = data.map((country) => ({
          flag: country.flags.svg,
          cca3: country.cca3,
          name: country.name.common,
          population: country.population,
          area: country.area,
          subregion: country.subregion,
          languages: country.languages,
        }));

        if (filterType === "population") {
          filteredCountries.sort((a, b) => b.population - a.population);
        } else if (filterType === "area") {
          filteredCountries.sort((a, b) => b.area - a.area);
        }

        setCountries(filteredCountries);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    getCountries();
  }, [filterType]);

  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container filter-container">
      <h2 className="text-center mb-4">
        Filter by {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
      </h2>
      <ul className="list-unstyled">
        {currentCountries.map((country, index) => (
          <li key={country.cca3} className="country-item d-flex align-items-center">
            <span className="country-index me-2 fw-bold">
              {indexOfFirstCountry + index + 1}.
            </span>
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="country-flag-small me-3"
            />
            <span className="flex-grow-1">{country.name}</span>
            <span className="fw-bold">
              {filterType === "population"
                ? country.population.toLocaleString()
                : filterType === "area"
                ? country.area.toLocaleString()
                : "N/A"}
            </span>
          </li>
        ))}
      </ul>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilterByPopulation;
