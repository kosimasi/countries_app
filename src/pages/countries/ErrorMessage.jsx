import React from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.css"; // Optional styling file

const ErrorMessage = ({ message = "An error occurred", onRetry }) => (
  <div className="error-message">
    <p>{message}</p>
    {onRetry && (
      <button className="retry-button" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;