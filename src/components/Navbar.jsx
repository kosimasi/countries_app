import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import MainNavbar from "./MainNavbar";
import { useSelector, useDispatch } from "react-redux";
import { selectThemeMode, toggleTheme } from "../features/theme/ThemeSlice";
import "./Navbar.css";

const Navbar = ({ onSearch, onContinentSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
   <TopNavbar themeMode={themeMode} scrolled={scrolled} />
<MainNavbar
        themeMode={themeMode}
        scrolled={scrolled}
        toggleSearchDrawer={toggleSearchDrawer}
        onContinentSelect={onContinentSelect}
        handleThemeToggle={handleThemeToggle}
        isSearchOpen={isSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
    </>
  );
};
export default Navbar;
