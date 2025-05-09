import { useEffect, useState } from "react";
import { BookWithRatings } from "../types/bookratings";
import "./BookList.css";
import { useNavigate } from "react-router-dom";

const TIER_COLORS: Record<string, string> = {
  '1': '#2E7D32', 
  '2': '#FFF176', 
  '3': '#F4A623', 
  '4': '#F44336',
  '5': '#000000',
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

  const BookList = ({ searchTitle, searchAuthor }: { searchTitle: string; searchAuthor: string }) => {
  const [books, setBooks] = useState<BookWithRatings[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchBooks = async () => {
          try {
              setLoading(true);
              const response = await fetch(`https://localhost:5000/Book/JoinedRatings?title=${searchTitle}&author=${searchAuthor}`);
              if (!response.ok) throw new Error("Network response was not ok");

              const data = await response.json();
              setBooks(data);
          } catch (error) {
              console.error("Error fetching books:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchBooks();
  }, [searchTitle, searchAuthor]);


  // Filter books based on search term
  const filteredBooks = books.filter(book => {
    if (searchTitle) return true; // Show all books if no search term
    const searchLower = searchTitle.toLowerCase();
    return (
      book.title?.toLowerCase().includes(searchLower) ||
      book.author?.toLowerCase().includes(searchLower)
    );
  });

  const booksByTier = groupByTier(filteredBooks);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="book-list">
      {Object.keys(booksByTier).length === 0 ? (
        <div>No books found for "{searchTitle}"</div>
      ) : (
        Object.keys(booksByTier).sort().map(tier => (
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
                    <a href="">View Rating</a>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
