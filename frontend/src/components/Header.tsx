import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="header-left">
      <a href="/"><img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" /></a>
    </div>
    <div className="header-right">
      <span className="sign-in">Sign in</span><br />
      <button className="get-started">Get Started</button>
    </div>
  </header>
);

export default Header; 