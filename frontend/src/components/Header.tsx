import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { BookWithRatings } from '../types/bookratings';

interface HeaderProps {
  onSearch: (search: string) => void;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isSearchActive, setIsSearchActive }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<BookWithRatings[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const authPages = ["/", "/login", "/create-account", "/choose-account"];
  const isAuthPage = authPages.includes(location.pathname);
  const isUserPage = location.pathname.startsWith("/book-details") || location.pathname === "/home";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        if (searchInput === '') {
          setIsSearchActive(false);
        }
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchInput, setIsSearchActive]);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      navigate("/home");
      return;
    }
    onSearch(searchInput);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setIsSearchActive(true);
    fetchSearchResults(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput.trim() === "") {
        navigate("/home");
        return;
      }
      onSearch(searchInput);
    }
  };

  const fetchSearchResults = async (searchTerm: string) => {
    try {
      const response = await fetch(`https://localhost:5000/Book/JoinedRatings?title=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsSearchActive(true);
    fetchSearchResults('');
  };

  const handleBookSelect = (book: BookWithRatings) => {
    setSearchInput("");
    setIsSearchActive(false);
    setIsSearchFocused(false);
    setSearchResults([]);
    navigate(`/book-details/${book.bookId}`, { state: { book } });
  };

  const handleOverlayClick = () => {
    setSearchInput("");
    setIsSearchActive(false);
    setIsSearchFocused(false);
    setSearchResults([]);
  };

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

  if (isUserPage) {
    return (
      <>
        {isSearchFocused && (
          <div className="search-overlay" onClick={handleOverlayClick} />
        )}
        <header className="header">
          <div className="header-left">
            <a href="/home">
              <img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-imgs" />
            </a>
          </div>
          <div className="header-center" ref={searchRef}>
            <form className="header-search-form" onSubmit={handleSubmit}>
              <input
                className="header-search-input"
                type="text"
                placeholder="Search books..."
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={handleSearchFocus}
              />
              {searchInput !== "" && (
                <i className="fas fa-times clear-search-icon" onClick={handleOverlayClick} />
              )}
              <button className="header-search-btn" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>

            {isSearchActive && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((book) => (
                  <div
                    key={book.bookId}
                    className="search-result-item"
                    onClick={() => handleBookSelect(book)}
                  >
                    <div className="search-result-title">{book.title}</div>
                    <div className="search-result-author">{book.author}</div>
                  </div>
                ))}
              </div>
            )}
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
              <div className={`user-dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <div className="dropdown-item" onClick={() => navigate("/account")}>
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
                <div
                  className="dropdown-item logout"
                  onClick={() => navigate("/")}
                >
                  <span className="dropdown-center">Sign Out of BookRata</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  // Auth pages (login, create-account, etc.)
  return (
    <header className="header">
      <div className="header-left">
        <a href="/">
          <img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-imgs" />
        </a>
      </div>
      <div className="header-right">
        <button className="sign-in" onClick={() => navigate("/login")}>
          Sign In
        </button>
        <button className="get-started" onClick={() => navigate("/create-account")}>
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
