import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch, onContinentSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Countries App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/countries" onClick={() => onContinentSelect('all')}>
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/countries" onClick={() => onContinentSelect('Africa')}>
                Africa
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/countries" onClick={() => onContinentSelect('Americas')}>
                Americas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/countries" onClick={() => onContinentSelect('Asia')}>
                Asia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/countries" onClick={() => onContinentSelect('Europe')}>
                Europe
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/countries" onClick={() => onContinentSelect('Oceania')}>
                Oceania
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
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
    </nav>
  );
};

export default Navbar;