import StatusBar from '../components/StatusBar';
import './choosePlanPage.css';
import { useNavigate } from 'react-router-dom';

function ChoosePlanPage() {
  const navigate = useNavigate();
  return (
    <div className="choose-bg">
      <div className="choose-container-outer">
        <StatusBar currentStep={2} />
        <div className="choose-header">
          <p>Choose Your Plan</p>
        </div>
        <div className="plan-row">
          <div className="plan-card">
            <div className="plan-title">Free</div>
            <div className="plan-price"><span>$</span> <span className='fs-2'>0</span> <span>/ mo</span></div>
            <ul className="plan-features">
              <li>Unlimited Title & Author Search</li>
              <li>Limited Advanced Search</li>
              <li>Search History</li>
              <li>Ratings Breakdown by Category</li>
              <li>List item</li>
            </ul>
            <button className="select-plan" onClick={() => navigate('/home')}>Select</button>
          </div>
          <div className="plan-card">
            <div className="plan-title">Silver</div>
            <div className="plan-price"><span>$</span> <span className='fs-2'>3</span> <span>/ mo</span></div>
            <ul className="plan-features">
              <li>Everything from Free Plan</li>
              <li>Unlimited Advanced Search</li>
              <li>Saved Searches</li>
              <li>Share Books</li>
              <li>Purchase Links</li>
            </ul>
            <button className="select-plan" onClick={() => navigate('/home')}>Select</button>
          </div>
          <div className="plan-card">
            <div className="plan-title">Gold</div>
            <div className="plan-price"><span>$</span> <span className='fs-2'>5</span> <span>/ mo</span></div>
            <ul className="plan-features">
              <li>Everything from Silver Plan</li>
              <li>Automatic Search Emails</li>
              <li>Request a Book</li>
              <li>Full Ratings Reports</li>
              <li>Cover Photo Search</li>
            </ul>
            <button className="select-plan" onClick={() => navigate('/home')}>Select</button>
          </div>
        </div>
        <div className="plan-feature-box">
          <ul>
            <li>See clear content ratings for language, sex, violence, and more</li>
            <li>Make smarter choices for you and your family</li>
            <li>Save time, money, and frustration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChoosePlanPage;