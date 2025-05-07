import StatusBar from '../components/StatusBar';
import './createAccountPage.css'
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation here if needed
    navigate('/choose-plan');
  };

  return (
    <div className="create-account-bg">
      <div className="create-account-container">
        <StatusBar currentStep={1} />
        <h3>Create an account</h3>
        <p>Enter your Email to Create an account</p><br />
        <form className='form-container' onSubmit={handleSubmit}>
          <input className="create-input" type="email" placeholder="Email" autoFocus />
          <input className="create-input" type="password" placeholder="Password" />
          <input className="create-input" type="password" placeholder="Confirm Password" />
          <button className="continue-btn" type='submit'>
            Continue
          </button>
        </form>
        <br />
        <p className='pt-2'>Already a Member?</p>
        <a href="/login" className='signin'>Sign in</a>
        <hr/>
        <p className='policy'>By creating an account, you agree to the <a href="">Terms of Use</a> and <a href="">Privacy Policy</a></p>
      </div>
    </div>
  );
}

export default CreateAccountPage;