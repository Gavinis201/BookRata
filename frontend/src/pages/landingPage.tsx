import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './landingPage.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/create-account');
  };

  return (
    <div className="landing-page-bg">
      <div className="landing-content">
        <h1>Know What You're Reading - </h1>
        <h1>Before you Read it.</h1>
        <br />
        <h5>BookRata gives you honest, AI-powered content ratings - so 
            you can know what's inside before you buy or start reading</h5>
        <br />
        <h5>No More Guessing. No more Suprises. Just Clarity.</h5>
        <br />
        <form onSubmit={handleSearchSubmit}>
          <div className="search-bar-wrapper">
            <input className='input' type="text" placeholder='Search For a Book' />
            <button className='free-trial'onClick={() => navigate('/create-account')} >Try for Free</button><br /><br />
          </div>
        </form>
        <h5><FontAwesomeIcon icon={faCheck} />&nbsp; See clear content ratings for language, sex, violence, and more</h5><br />
        <h5><FontAwesomeIcon icon={faCheck} />&nbsp; Make smarter choices for you and your family</h5><br />
        <h5><FontAwesomeIcon icon={faCheck} />&nbsp; Save time, money, and frustration</h5><br />
        <h5><FontAwesomeIcon icon={faCheck} />&nbsp; Get started with a free trial</h5><br />

        <button className='learn-more' onClick={() => navigate('/')}>Learn More</button>
      </div>
    </div>
  );
}
export default LandingPage;
