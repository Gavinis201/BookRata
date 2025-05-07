import React from 'react';  
import './homePage.css'; // Assuming you have a CSS file for styling    
import BookFilters from '../components/BookFilters';
import BookList from '../components/bookList';

function HomePage() {
    
    return(
        <div className="home-container">
            <div className="filter-container">
                <h5>Book Filters</h5>
                <BookFilters />
            </div>
            <div className="books-container">
            <BookList />
            </div>
            
        </div>
    )
}

export default HomePage;