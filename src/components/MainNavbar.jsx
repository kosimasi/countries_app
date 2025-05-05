import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";
import ThemeToggle from "./ThemeToggle";

const MainNavbar = ({
  themeMode,
  toggleSearchDrawer,
  onContinentSelect,
  handleThemeToggle,
  isSearchOpen,
  searchTerm,
  setSearchTerm,
  handleSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        themeMode === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-primary"
      } sticky-top`}
    >
      <div className="container-fluid">
        
      {!isSearchOpen ? (
          <>
            <div className="d-flex justify-content-between w-100 align-items-center">
              <button
                className="navbar-toggler p-2 border-0"
                type="button"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation"
              >
                <FontAwesomeIcon
                  icon={mobileMenuOpen ? faTimes : faBars}
                  className={themeMode === "dark" ? "text-light" : "text-light"}
                  size="lg"
                />
              </button>

              <button
                className={`btn ${themeMode === "dark" ? "btn-dark" : "btn-light"} ms-2 me-auto`}
                onClick={toggleSearchDrawer}
              >
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                <span className="d-none d-sm-inline">Search</span>
              </button>

              <ThemeToggle
                themeMode={themeMode}
                handleThemeToggle={handleThemeToggle}
                className="ms-2"
              />
            </div>

            <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>
              <div className="d-flex flex-column flex-lg-row align-items-lg-center w-100 mt-2 mt-lg-0">
                <div className="d-flex flex-column flex-lg-row w-100">
                  <DropdownMenu
                    title="Continent"
                    themeMode={themeMode}
                    items={["all", "Africa", "Americas", "Asia", "Europe", "Oceania"]}
                    onSelect={(item) => {
                      onContinentSelect(item);
                      setMobileMenuOpen(false);
                    }}
                    mobileMode={!mobileMenuOpen}
                  />

                  <DropdownMenu
                    title="Filter"
                    themeMode={themeMode}
                    items={["Population", "Area", "Region", "Subregion", "Language", "Currency"]}
                    onSelect={(item) => {
                      onContinentSelect(item);
                      setMobileMenuOpen(false);
                    }}
                    mobileMode={!mobileMenuOpen}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex w-100 align-items-center">
            <button
              className="btn btn-link text-light me-2"
              onClick={toggleSearchDrawer}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            
            <form className="flex-grow-1" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
