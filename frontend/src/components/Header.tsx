import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (search: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value); // Update search as user types
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  if (isHome) {
    return (
      <header className="header">
        <div className="header-left">
          <a href="/home"><img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" /></a>
        </div>
        <div className="header-center">
          <form className="header-search-form" onSubmit={handleSubmit}>
            <input
              className="header-search-input"
              type="text"
              placeholder="Search books..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button className="header-search-btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="header-right">
          <span className="header-username">Welcome, Gavin</span>
          <div 
            className="user-dropdown-container"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fas fa-user-circle header-user-icon"></i>
            <div className={`user-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <div className="dropdown-item">
                <i className="fas fa-user"></i>
                <span className="ms-2">Account</span>
              </div>
              <div className="dropdown-item">
                <i className="fas fa-info-circle"></i>
                <span className="ms-2">Help Center</span>
              </div>
              <div className="dropdown-item">
                <i className="fas fa-clipboard-list"></i>
                <span className="ms-2">Rating Guide</span>
              </div>
              <div className="dropdown-item">
                <i className="fas fa-question-circle"></i>
                <span className="ms-2">Request Book Rating</span>
              </div>
              <div className="dropdown-item">
                <i className="fas fa-dollar-sign"></i>
                <span className="ms-2">Donate</span>
              </div>
              <div className="dropdown-item logout" onClick={() => {
                navigate("/");
              }}>
                <span className="dropdown-center">Sign Out of BookRata</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Only show buttons on the landing page
  return (
    <header className="header">
      <div className="header-left">
        <a href="/"><img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" /></a>
      </div>
      <div className="header-right">
        <button className="sign-in" onClick={() => navigate("/login")}>Sign In</button>
        <button className="get-started" onClick={() => navigate("/create-account")}>Get Started</button>
      </div>
    </header>
  );
};

export default Header; 