import React from "react";

const SearchDrawer = ({
  isSearchOpen,
  toggleSearchDrawer,
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  return (
    <div className={`search-drawer ${isSearchOpen ? "open" : ""}`}>
      <div className="search-header">
        <button
          className="close-button btn btn-danger position-relative alert-pulse"
          onClick={toggleSearchDrawer}
        >
          <span className="position-absolute top-50 start-50 translate-middle fw-bold">
            X
          </span>
        </button>
        <h2>Search For Country</h2>
      </div>

      <div className="search-input-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
            className="search-input"
            autoFocus
          />
        </form>
      </div>

      {searchTerm && (
        <div className="current-search-term">
          Searching for: <strong>{searchTerm}</strong>
        </div>
      )}
    </div>
  );
};

export default SearchDrawer;
