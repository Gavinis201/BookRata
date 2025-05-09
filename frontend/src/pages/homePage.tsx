import React from 'react';  
import './homePage.css'; // Assuming you have a CSS file for styling    
import BookFilters from '../components/BookFilters';
import BookList from '../components/bookList';

interface HomePageProps {
    searchTerm: string;
    searchAuthor: string;
    onAuthorSearch: (author: string) => void;
}

function HomePage({ searchTerm, searchAuthor, onAuthorSearch }: HomePageProps) {
    return(
        <div className="home-container">
            <div className="sidebar-container">
                <BookFilters onAuthorSearch={onAuthorSearch} />
            </div>
            <div className="books-container">
                <BookList searchTitle={searchTerm} searchAuthor={searchAuthor}/>
            </div>
        </div>
    )
}

export default HomePage;