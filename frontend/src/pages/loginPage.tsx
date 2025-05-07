import './loginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const navigate = useNavigate();
  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-left">
          <div className="login-title"><img src="/bookRataLogo.png" alt="BookRata Logo" className="logo-img" /></div>
          <input className="login-input" type="email" placeholder="Email" autoFocus />
          <input className="login-input" type="password" placeholder="Password" />
          <button className="login-btn" onClick={() => navigate('/home')}>Sign In</button>
        </div>
        <div className="vertical-line"></div>
        <div className="login-right">
          <div className="login-title">Log In</div>
          <div className="login-link">Forgot password?</div>
          <div className="login-signup">Don't have an account? <span className="login-link" onClick={() => navigate('/create-account')}>Sign up</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;