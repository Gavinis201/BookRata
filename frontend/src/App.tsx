import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/landingPage';
import CreateAccountPage from './pages/CreateAccountPage';
import ChoosePlanPage from './pages/choosePlanPage';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/homePage';
import { useState } from 'react';

function App() {
  const [searchBook, setSearchBook] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  const handleAuthorSearch = (author: string) => {
    setSearchAuthor(author);
  };

  return (
    <Router>
      <Header onSearch={setSearchBook}/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/choose-plan" element={<ChoosePlanPage />} />
        <Route path="/home" element={
          <HomePage 
            searchTerm={searchBook} 
            searchAuthor={searchAuthor}
            onAuthorSearch={handleAuthorSearch}
          />
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
