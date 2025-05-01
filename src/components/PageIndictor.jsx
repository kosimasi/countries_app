import React from "react";
import PropTypes from "prop-types";

const PageIndicator = ({ currentPage, totalPages }) => (
  <p className="text-center mx-2">
    Page {currentPage} of {totalPages}
  </p>
);

PageIndicator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PageIndicator;