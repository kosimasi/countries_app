import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ onSearch, onContinentSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setIsSearchOpen(false);
  };

  const toggleSearchDrawer = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm("");
      onSearch("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      {!isSearchOpen && (
        <>
          <div
            className={`bg-success py-2 text-light transition-all duration-300 ${
              scrolled
                ? "h-0 opacity-0 overflow-hidden py-0"
                : "h-auto opacity-100"
            }`}
          >
            <Link className="navbar-brand w-100 col-12" to="/">
              Countries App
            </Link>
          </div>

          <div
            className={`sticky-top bg-secondary text-light ${
              scrolled ? "top-0" : ""
            }`}
          >
            <div className="container-fluid px-0">
              <div
                className="d-flex flex-column flex-lg-row align-items-center 
              justify-content-between"
              >
                <button
                  className="navbar-toggler d-lg-none me-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarContent"
                  aria-controls="navbarContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse d-lg-block w-100"
                  id="navbarContent"
                >
                  <div
                    className="d-flex flex-column flex-lg-row align-items-lg-center 
                  justify-content-between w-100 bg-primary"
                  >
                    {" "}
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <button
                        className="btn bg-light text-dark m-2 p-2 search-button"
                        onClick={toggleSearchDrawer}
                      >
                         <FontAwesomeIcon icon={faSearch} className="icon-style mx-2" />
                        Search 
                      </button>
                      <div
                        className="dropdown"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                      >
                        <a className="cont-link">Continent</a>

                        {isOpen && (
                          <ul className="dropdown-menu dropdown-menu-end show link-dropdown">
                            {[
                              "all",
                              "Africa",
                              "Americas",
                              "Asia",
                              "Europe",
                              "Oceania",
                            ].map((continent) => (
                              <li key={continent} className="dropdown-item">
                                <Link
                                  className="dropdown-link"
                                  to="/countries"
                                  onClick={() => {
                                    onContinentSelect(continent);
                                    setIsOpen(false);
                                  }}
                                >
                                  {continent === "all" ? "All" : continent}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <button className="btn bg-light text-dark m-2 p-2">
                      <FontAwesomeIcon icon={faSun} className="icon-style" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Drawer */}
      <div className={`search-drawer ${isSearchOpen ? "open" : ""}`}>
        <div className="search-header">
          <button 
  className="close-button btn btn-danger position-relative alert-pulse" 
  onClick={toggleSearchDrawer}
>
  <span className="position-absolute top-50 start-50 translate-middle fw-bold">X</span>
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
    </>
  );
};
export default Navbar;
