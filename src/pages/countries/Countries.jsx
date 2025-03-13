import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Navbar from './Navbar';
import './countries.css';

const fetchCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  return response.json();
};

const Countries = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const itemsPerPage = 12;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries...</p>;
  if (!Array.isArray(data)) return <p>No data found...</p>;

  // Filter countries by search term and continent
  const filteredCountries = data
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((country) =>
      selectedContinent === 'all' ? true : country.region === selectedContinent
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  // Pagination logic
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const currentCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          <div key={country.cca3} className="col-md-3 my-4">
            <div className="card h-100 text-center">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{country.name.common}</h5>
                <p className="card-text">
                  <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                </p>
                <Link
                  to={`/country/${country.cca3}`}
                  className="btn button"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default Countries;

 