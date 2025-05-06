import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/landingPage'

function App() {

  return (
    <>
     <Header />
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/books" element={<BookList />} /> */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
     </Router>
     <Footer />
    </>
  )
}

export default App
