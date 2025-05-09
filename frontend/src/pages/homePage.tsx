import React, { useState } from 'react';  
import './homePage.css'; // Assuming you have a CSS file for styling    
import BookFilters from '../components/BookFilters';
import BookList from '../components/bookList';

interface HomePageProps {
    searchTerm: string;
}

function HomePage({ searchTerm }: HomePageProps) {
    const [searchAuthor, setSearchAuthor] = useState('');
    const [searchTags, setSearchTags] = useState<string[]>([]);

    const handleAuthorSearch = (author: string) => {
        setSearchAuthor(author);
    };
    const handleTagFilter = (tags: string[]) => {
    setSearchTags(tags);
};


    return(
        <div className="home-container">
            <div className="sidebar-container">
                <BookFilters onAuthorSearch={handleAuthorSearch} onTagFilter={handleTagFilter} />

            </div>
            <div className="books-container">
                <BookList searchTitle={searchTerm} searchAuthor={searchAuthor} searchTags={searchTags}/>
            </div>
        </div>
    )
}

export default HomePage;