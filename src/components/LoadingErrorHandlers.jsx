import React from "react";
import { Spinner, Alert } from "react-bootstrap";

const LoadingErrorHandlers = ({ isLoading, error, data }) => {
  if (isLoading)
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading country details...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-screen">
        <Alert variant="danger" className="mt-4">
          <h4> ❌ Error loading country details. Please try again later.</h4>
          <p>Please try again later or check your internet connection.</p>
        </Alert>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="not-found-screen">
        <Alert variant="warning" className="mt-4">
          <h4>⚠️ Country not found</h4>
          <p>The requested country data is not available.</p>
        </Alert>
      </div>
    );

  return null;
};

export default LoadingErrorHandlers;