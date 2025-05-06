import "./Footer.css";


const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-logo-section">
      <div className="footer-logo">
        <a href="/"><img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" /></a>
      </div>
      <div className="footer-tagline">
        Know what you're reading - before you read it.
      </div>
      </div>
      <div className="footer-col">
      <div className="footer-title">Quick Links</div>
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">FAQ's</a>
      </div>
      <div className="footer-col">
      <div className="footer-title">Legal</div>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Preferences</a>
      </div>
      <div className="footer-col">
      <div className="footer-title">Contact</div>
      <div>Email: gavin@bookrata.com</div>
      <div>9205 W Russell Rd Ste 305</div>
      <div>Las Vegas, NV 89148</div>
      </div>
      <div className="footer-col">
      <div className="footer-title">Subscribe</div>
      <div>Get book rating updates straight to your inbox</div>
      <form className="footer-subscribe" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Email" />
        <button type="submit">Subscribe</button>
      </form>
      </div>
    </div>
    <div className="footer-bottom">
      <div>© 2025 BookRata. All rights reserved.</div>
      <div className="footer-social">
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  </footer>
);

export default Footer; 