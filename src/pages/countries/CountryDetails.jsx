import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchCountryDetails = async (cca3) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
  return response.json();
};

const CountryDetails = () => {
  const { cca3 } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['country', cca3],
    queryFn: () => fetchCountryDetails(cca3),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading country details...</p>;
  if (!data || data.length === 0) return <p>No data found...</p>;

  const country = data[0];

  return (
    <div className="container mt-4">
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <p><strong>Currencies:</strong> {Object.values(country.currencies).map((currency) => currency.name).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;