import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import LandingPage from './pages/landingPage';
import CreateAccountPage from './pages/createAccountPage';
import ChoosePlanPage from './pages/choosePlanPage';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/homePage';
import { useState } from 'react';
import BookDetailsPage from './pages/bookDetailsPage';

function App() {
  const [searchBook, setSearchBook] = useState('');

  return (
    <Router>
      <Header onSearch={setSearchBook}/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/choose-plan" element={<ChoosePlanPage />} />
        <Route path="/home" element={<HomePage searchTerm={searchBook} />} />
        <Route path="/book-details/:id" element={<BookDetailsPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
