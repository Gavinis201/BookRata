import { useLocation } from 'react-router-dom';

function BookDetails() {
    const location = useLocation();
    const { book } = location.state || {};

    if (!book) {
        return <div>No book data provided. Please navigate from the book list</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>By {book.author}</h2>
            <p>{book.bookSummary}</p>
            <p>Overall Tier: {book.overallTier}</p>
            {/* Add more details here */}
        </div>
    );
}

export default BookDetails;
