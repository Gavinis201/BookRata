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

  const authPages = ["/", "/login", "/create-account", "/choose-account"];
  const isAuthPage = authPages.includes(location.pathname);
  const isUserPage = location.pathname.startsWith("/book-details") || location.pathname === "/home";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [bookTitles, setBookTitles] = useState<{ bookId: number; title: string }[]>([]);
  const [searchResults, setSearchResults] = useState<BookWithRatings[]>([]);

  useEffect(() => {
    const fetchBookTitles = async () => {
      try {
        const response = await fetch("https://localhost:5000/Book/BookTitles");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBookTitles(data);
      } catch (error) {
        console.error("Error fetching book titles:", error);
      }
    };

    fetchBookTitles();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setIsSearchActive(value.length > 0);
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchInput.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`https://localhost:5000/Book/JoinedRatings?title=${encodeURIComponent(searchInput)}`);
        if (!response.ok) throw new Error("Failed to fetch search results");
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

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

  const handleBookSelect = (book: BookWithRatings) => {
    setSearchInput("");
    setIsSearchActive(false);
    navigate(`/book-details/${book.bookId}`, { state: { book } });
  };

  if (isUserPage) {
    return (
      <>
        {isSearchActive && (
          <div
            className="screen-overlay"
            onClick={() => {
              setIsSearchActive(false);
              setSearchInput("");
              setSearchResults([]);
            }}
          ></div>
        )}
        <header className="header">
          <div className="header-left">
            <a href="/home">
              <img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" />
            </a>
          </div>
          <div className="header-center" style={{ position: "relative" }}>
            <form className="header-search-form" onSubmit={handleSubmit}>
              <input
                className="header-search-input"
                type="text"
                placeholder="Search books..."
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsSearchActive(true)}
              />
              {searchInput !== "" && (
                <i
                  className="fas fa-times clear-search-icon"
                  onClick={() => {
                    setSearchInput("");
                    setIsSearchActive(false);
                    setSearchResults([]);
                    onSearch("");
                    navigate("/home");
                  }}
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
