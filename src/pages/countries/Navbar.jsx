import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectThemeMode, toggleTheme } from "../../features/theme/ThemeSlice";
import "./Navbar.css";

const Navbar = ({ onSearch, onContinentSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [continentOpen, setContinentOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
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
            className={`top-navbar py-2 text-light transition-all 
              duration-300 
              ${themeMode === "dark" ? "dark" : ""} 
            ${
              scrolled
                ? "h-0 opacity-0 overflow-hidden py-0"
                : "h-auto opacity-100"
            }`}
          >
            <div className="containteir-fluid">
              <div className="d-flex justify-content-between align-items-center">
                <Link className="navbar-brand" to="/">
                  Countries App
                </Link>
                <div className="social-icons   d-flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="icon" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="icon" />
                  </a>
                  <a
                    href="https://wa.me/PHONENUMBER"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="icon" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`container-fluid px-0 sticky-top ${
              scrolled ? "top-0" : ""
            } `}
          >
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
                  className={`d-flex flex-column flex-lg-row align-items-lg-center 
                  justify-content-between w-100 bg-primary ${ themeMode === "dark" ? "bg-dark" : ""}`}
                >
                  <div className="d-flex flex-column flex-lg-row align-items-center">
                    <button
                      className={`btn bg-light m-2 p-2 search-button
                        ${themeMode === "dark"?"text-light bg-dark":""}`}
                      onClick={toggleSearchDrawer}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        className={`icon-style mx-2 ${themeMode === "dark"?"text-light":"light"}`}
                      />
                      Search
                    </button>
                    <div
                      className="dropdown"
                      onMouseEnter={() => setContinentOpen(true)}
                      onMouseLeave={() => setContinentOpen(false)}
                    >
                      <a className="cont-link">Continent</a>

                      {continentOpen && (
                        <ul className={`dropdown-menu dropdown-menu-end show link-dropdown
                        ${themeMode === "dark"? "dark":""}`}>
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
                                className={`dropdown-link ${themeMode === "dark" ? "dark" : ""}`}
                                to="/countries"
                                onClick={() => {
                                  onContinentSelect(continent);
                                  setContinentOpen(false);
                                }}
                              >
                                {continent === "all" ? "All" : continent}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div
                      className={`dropdown ${themeMode === "dark" ? "dark" :""}`}
                      onMouseEnter={() => setFilterOpen(true)}
                      onMouseLeave={() => setFilterOpen(false)}
                    >
                      <a className="cont-link">Filter By</a>

                      {filterOpen && (
                        <ul className={`dropdown-menu dropdown-menu-end show link-dropdown
                        ${themeMode === "dark" ? "dark" : ""}`}>
                          {[
                            "Population",
                            "Area",
                            "Region",
                            "Subregion",
                            "Language",
                            "Currency",
                          ].map((continent) => (
                            <li key={continent} className="dropdown-item">
                              <Link
                                className={`dropdown-link ${themeMode === "dark" ? "dark" :""}`}
                                to="/countries"
                                onClick={() => {
                                  onContinentSelect(continent);
                                  setFilterOpen(false);
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
                  <button
                    className={`btn theme-toggle-btn 
                      ${themeMode === "dark" ? "bg-dark text-light":"bg-primary text-light"}`}
                    onClick={handleThemeToggle}
                    aria-label={`Switch to ${
                      themeMode === "dark" ? "light" : "dark"
                    } mode`}
                  >
                    {themeMode === "dark" ? (
                      <FontAwesomeIcon icon={faSun} className="icon-style " />
                    ) : (
                      <FontAwesomeIcon icon={faMoon} className="icon-style" />
                    )}
                  </button>
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
    </>
  );
};
export default Navbar;
