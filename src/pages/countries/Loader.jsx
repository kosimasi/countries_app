import React from "react";
import PropTypes from "prop-types";
import "./Loader.css"; // Optional styling file

const Loader = ({ message = "Loading..." }) => (
  <div className="loader-container">
    <div className="loader-spinner"></div>
    <p className="loader-text">{message}</p>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string,
};

export default Loader;