import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './landingPage.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  return (
    <div className="landing-page-bg">
      <div className="landing-content">
        <h1>Know What You're Reading - </h1>
        <h1>Before you Read it.</h1>
        <br /><br />
        <h5>BookRata gives you honest, AI-powered content ratings - so 
            you can know what’s inside before you buy or start reading</h5>
        <br />
        <h5>No More Guessing. No more Suprises. Just Clarity.</h5>
        <br /><br />
      <input className='input' type="text" placeholder='Search For a Book' />
      <button className='free-trial' >Try for Free</button>
      <br /><br />
      <h5><FontAwesomeIcon icon={faCheck} />&nbsp; See clear content ratings for language, sex, violence, and more</h5><br />
      <h5><FontAwesomeIcon icon={faCheck} />&nbsp; Make smarter choices for you and your family</h5><br />
      <h5><FontAwesomeIcon icon={faCheck} />&nbsp; Save time, money, and frustration</h5><br />
      </div>
    </div>
  );
}
export default LandingPage;
