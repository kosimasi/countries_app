import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaTwitter } from "react-icons/fa";

const TopNavbar = ({ themeMode, scrolled }) => {
  return (
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
          <div className="social-icons d-flex gap-3">
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
  );
};

export default TopNavbar;