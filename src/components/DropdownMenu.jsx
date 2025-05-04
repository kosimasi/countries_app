import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ title, items, themeMode, onSelect, mobileMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine if we're in mobile mode based on screen width
  const isMobile = window.innerWidth < 992; 

  return (
    <div 
      className={`dropdown ${mobileMode ? "dropdown-mobile" : ""} my-1 my-lg-0 mx-lg-1`}
      onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
    >
      <button
        className={`btn ${themeMode === "dark" ? "btn-dark" : "btn-light"} w-100 text-start`}
        onClick={isMobile ? () => setIsOpen(!isOpen) : undefined}
        aria-expanded={isOpen}
      >
        {title}
      </button>

      <div 
        className={`dropdown-menu ${isOpen ? 'show' : ''} ${themeMode === "dark" ? "bg-dark" : "bg-light"}`}
        // Close when clicking outside on mobile
        onClick={isMobile ? () => setIsOpen(false) : undefined}
      >
        {items.map((item) => (
          <Link
            key={item}
            className={`dropdown-item ${themeMode === "dark" ? "text-light" : "text-dark"}`}
            to="/countries"
            onClick={() => {
              onSelect(item);
              setIsOpen(false);
            }}
          >
            {item === "all" ? "All" : item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;