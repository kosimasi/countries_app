import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid bg-dark">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="navbar-brand" href="#">
                  Navbar
                </a>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pract" className="nav-link">
                  practice
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;