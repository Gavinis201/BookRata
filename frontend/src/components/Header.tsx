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
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<BookWithRatings[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchInput, setIsSearchActive]);

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

  const handleSearchBlur = () => {
    // Don't immediately hide results to allow clicking on them
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setIsSearchFocused(false);
        if (searchInput === '') {
          setIsSearchActive(false);
        }
      }
    }, 200);
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

  if (isUserPage) {
    return (
      <>
        {isSearchFocused && (
          <div 
            className="search-overlay"
            onClick={handleOverlayClick}
          />
        )}
        <header className="header">
          <div className="header-left">
            <a href="/home">
              <img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" />
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
                onBlur={handleSearchBlur}
              />
              {searchInput !== "" && (
                <i
                  className="fas fa-times clear-search-icon"
                  onClick={handleOverlayClick}
                />
              )}
              <button className="header-search-btn" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>

            {/* Search Dropdown */}
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
          </div>
        </header>
      </>
    );
  }

  return (
    <header className="header">
      <div className="header-left">
        <a href="/">
          <img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" />
        </a>
      </div>
      <div className="header-right">
        <a href="/login" className="sign-in">
          Sign in
        </a>
        <a href="/create-account" className="get-started">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
