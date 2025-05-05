import React from "react";
import { Row, Col } from "react-bootstrap";

const SearchDrawer = ({
  isSearchOpen,
  toggleSearchDrawer,
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  return (
    <div className={`search-drawer ${isSearchOpen ? "open" : ""} `}>
      <Row className="search-input-container">
        <Col lg={11} md={11} sm={10} xs={10}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search For a Country here ...."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="search-input"
              autoFocus
            />
          </form>
        </Col>
        <Col lg={1} md={1} sm={2} xs={2}>
          <div className="search-header">
            <button
              className="close-button btn btn-danger position-relative alert-pulse"
              onClick={toggleSearchDrawer}
            >
              <span className="position-absolute top-50 start-50 translate-middle fw-bold">
                X
              </span>
            </button>
          </div>
        </Col>
      </Row>

      {searchTerm && (
        <div className="current-search-term">
          Searching for <strong>{searchTerm}</strong>....
        </div>
      )}
    </div>
  );
};

export default SearchDrawer;
