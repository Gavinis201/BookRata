import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isLanding = location.pathname === "/";

  if (isHome) {
    return (
      <header className="header">
        <div className="header-left">
          <a href="/home"><img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" /></a>
        </div>
        <div className="header-center">
          <form className="header-search-form">
            <input className="header-search-input" type="text" placeholder="Search books..." />
            <button className="header-search-btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="header-right">
          <span className="header-username">Your Name</span>
          <i className="fas fa-user-circle header-user-icon"></i>
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
        {isLanding && (
          <>
            <button className="sign-in" onClick={() => window.location.href = '/login'}>Sign in</button>
            <button className="get-started" onClick={() => window.location.href = '/create-account'}>Get Started</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 