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
          <p><strong>Book Summary: </strong>{book.bookSummary}</p>
          <p><strong>Language Tier:</strong> {book.languageTier}</p>
          <p><strong>Language Reasoning:</strong> {book.languageReasoning}</p>
          <p><strong>Sex Tier:</strong> {book.sexTier}</p>
          <p><strong>Sex Reasoning:</strong> {book.sexReasoning}</p>
          <p><strong>Violence Tier:</strong> {book.violenceTier}</p>
          <p><strong>Violence Reasoning:</strong> {book.violenceReasoning}</p>
          <p><strong>Health Tier:</strong> {book.healthTier}</p>
          <p><strong>Health Reasoning:</strong> {book.healthReasoning}</p>
          <p><strong>Religion Tier:</strong> {book.religionTier}</p>
          <p><strong>Religion Reasoning:</strong> {book.religionReasoning}</p>
          <p><strong>LGBTQ Tier:</strong> {book.lgbtqTier}</p>
          <p><strong>LGBTQ Reasoning:</strong> {book.lgbtqReasoning}</p>
          <p><strong>Publish Date:</strong> {book.publishDate}</p>
          <hr />
          
        </div>
      ))}
    </div>
  );
};

export default BookList;
