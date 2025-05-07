import { useEffect, useState } from "react";
import { BookWithRatings } from "../types/bookratings";
import "./BookList.css";
import { useNavigate } from "react-router-dom";

const TIER_COLORS: Record<string, string> = {
  '1': '#2E7D32', // green
  '2': '#FFF176', // yellow/orange
  '3': '#F4A623', // red
  '4': '#F44336',
  '5': '#black',
  'Other': '#888',
};

function groupByTier(books: BookWithRatings[]) {
  return books.reduce((acc: Record<string, BookWithRatings[]>, book) => {
    const tier = book.overallTier != null && book.overallTier !== '' ? String(book.overallTier) : 'Other';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(book);
    return acc;
  }, {} as Record<string, BookWithRatings[]>);
}

const BookList = () => {
  const [books, setBooks] = useState<BookWithRatings[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://localhost:5000/Book/JoinedRatings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const booksByTier = groupByTier(books);

  return (
    <div className="book-list">
      {Object.keys(booksByTier).sort().map(tier => (
        <div key={tier}>
          <h2 className="tier-heading">Tier {tier}</h2>
          <div className="book-grid">
            {booksByTier[tier].map(book => {
              const tierStr = book.overallTier != null && book.overallTier !== '' ? String(book.overallTier) : 'Other';
              return (
                <div className="book-card" key={book.bookId} onClick={() => navigate(`/bookDetails/${book.bookId}`)}>
                  <div
                    className="tier-badge"
                    style={{ background: TIER_COLORS[tierStr] || '#888' }}
                  >
                    Tier {tierStr}
                  </div>
                  <img
                    className="book-cover"
                    src={'/BookRataCover.jpeg'}
                    alt={book.title}
                  />
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
