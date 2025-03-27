import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch, onContinentSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
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
      <div
        className={`bg-success py-2 text-light transition-all duration-300 ${
          scrolled ? "h-0 opacity-0 overflow-hidden py-0" : "h-auto opacity-100"
        }`}
      >
        <Link className="navbar-brand w-100 col-12" to="/">
          Countries App
        </Link>
      </div>
      <div className={`sticky-top bg-secondary text-light ${scrolled ? "top-0" : ""}`}>
        <div className="container-fluid px-0">
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between py-2 px-3">
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
              <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between w-100">
                <ul className="navbar-nav flex-row flex-wrap me-lg-3">
                  {[
                    "all",
                    "Africa",
                    "Americas",
                    "Asia",
                    "Europe",
                    "Oceania",
                  ].map((continent) => (
                    <li key={continent} className="nav-item me-2">
                      <Link
                        className="nav-link"
                        to="/countries"
                        onClick={() => onContinentSelect(continent)}
                      >
                        {continent === "all" ? "All" : continent}
                      </Link>
                    </li>
                  ))}
                </ul>
                <form className="d-flex mt-2 mt-lg-0" onSubmit={handleSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search country..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-light" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
