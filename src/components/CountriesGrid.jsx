import React from "react";
import CountryCard from "./CountryCard";
import PropTypes from "prop-types";

const CountriesGrid = ({ countries }) => {
  return (
    <div className="col-10">
      <div className="row">
        {countries.length > 0 ? (
          countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4>No countries match your search criteria</h4>
          </div>
        )}
      </div>
    </div>
  );
};

CountriesGrid.propTypes = {
  countries: PropTypes.array.isRequired,
};

export default CountriesGrid;