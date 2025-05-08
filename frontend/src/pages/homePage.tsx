import React from 'react';  
import './homePage.css'; // Assuming you have a CSS file for styling    
import BookFilters from '../components/BookFilters';
import BookList from '../components/bookList';

function HomePage() {
    
    return(
        <div className="home-container">
            <div className="sidebar-container">
                
                <BookFilters />
            </div>
            <div className="books-container">
            <BookList />
            </div>
            
        </div>
    )
}

export default HomePage;