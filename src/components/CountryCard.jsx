import React from "react";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { selectThemeMode } from "../features/theme/ThemeSlice";

const CountryCard = ({ country }) => {
  const themeMode = useSelector(selectThemeMode);

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 my-2">
      <div
        className={`card h-100 text-center ${
          themeMode === "dark" ? "dark" : ""
        }`}
      >
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{country.name.common}</h5>
          <p className="card-text">
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <Link to={`/country/${country.cca3}`} className="btn link-button">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
