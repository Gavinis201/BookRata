import { useEffect, useState } from "react";
import { BookWithRatings } from "../types/bookratings";



const BookList = () => {
  const [books, setBooks] = useState<BookWithRatings[]>([]);

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

  return (
    <div>
      {books.map((book) => (
        <div key={book.bookId}>
          <h2>{book.title}</h2>
          <p>Language Tier: {book.languageTier}</p>
          {/* Add other ratings as needed */}
        </div>
      ))}
    </div>
  );
};

export default BookList;
