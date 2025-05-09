import React, { useState, useEffect, useRef } from 'react';
import BookList from './BookList';
import BookFilters from './BookFilters';
import './homePage.css';

function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://localhost:5000/Book');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        setError('Error loading books. Please try again later.');
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = books.filter(book => {
      const bookText = `${book.title} ${book.author} ${book.description}`.toLowerCase();
      return searchTerms.every(term => bookText.includes(term));
    });
    setFilteredBooks(filtered);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className={`home-page ${isSearchFocused ? 'search-focused' : ''}`}>
      <div className="search-container">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="search-input"
        />
      </div>
      <BookFilters 
        onAuthorSearch={(author) => {
          const filtered = author 
            ? books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()))
            : books;
          setFilteredBooks(filtered);
        }}
        onTagFilter={(tags) => {
          if (tags.length === 0) {
            setFilteredBooks(books);
            return;
          }
          const filtered = books.filter(book => 
            tags.every(tag => book.tags.some(bookTag => bookTag.toLowerCase() === tag.toLowerCase()))
          );
          setFilteredBooks(filtered);
        }}
      />
      {isLoading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <BookList books={filteredBooks} />
      )}
    </div>
  );
}

export default HomePage; 