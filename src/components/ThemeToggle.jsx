import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = ({ themeMode, handleThemeToggle }) => {
  return (
    <button
      className={`btn theme-toggle-btn 
        ${themeMode === "dark" ? "bg-dark text-light" : ""} nav-btn`}
      onClick={handleThemeToggle}
      aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
    >
      {themeMode === "dark" ? (
        <FontAwesomeIcon icon={faSun} className="icon-style " />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="icon-style" />
      )}
    </button>
  );
};

export default ThemeToggle;