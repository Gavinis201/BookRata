import './loginPage.css';

function LoginPage() {
  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-left">
          <div className="login-title">bookrata</div>
          <input className="login-input" type="email" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Password" />
          <button className="login-btn">Log In</button>
        </div>
        <div className="vertical-line"></div>
        <div className="login-right">
          <div className="login-title">Log In</div>
          <div className="login-link">Forgot password?</div>
          <div className="login-signup">
            Don't have an account? 
            <br /></div>
            <span className="login-link">Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;