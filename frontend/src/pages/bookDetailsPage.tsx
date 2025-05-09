import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './bookDetailsPage.css';

interface TagObject {
  tagId?: string;
  tagName?: string;
  toString?: () => string;
}

function formatReviewDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const CATEGORIES = [
  { key: 'language', label: 'Language' },
  { key: 'sex', label: 'Sex' },
  { key: 'health', label: 'Health' },
  { key: 'violence', label: 'Violence' },
  { key: 'religion', label: 'Religion' },
  { key: 'lgbtq', label: 'LGBTQ+' },
];

const TIER_COLORS: Record<string, string> = {
  '1': 'var(--Tier-1)',
  '2': 'var(--Tier-2)',
  '3': 'var(--Tier-3)',
  '4': 'var(--Tier-4)',
  '5': 'var(--Tier-5)',
  'Other': '#888'
};

function AccordionItem({ title, tier, content }: { title: string, tier: any, content: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-title" onClick={() => setOpen(o => !o)}>
        <span
          className="book-details-tier-badge"
          style={{ background: TIER_COLORS[String(tier)] || TIER_COLORS.Other, color: String(tier) === '2' ? '#222' : '#fff' }}
        >
          Tier {tier}
        </span>
        {title}
        <span style={{marginLeft: 'auto'}}>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="accordion-content">{content}</div>}
    </div>
  );
}

function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  if (!book) {
    return <div className="book-details-container"><div>No book data provided. Please navigate from the book list</div></div>;
  }


  return (
    <>
    <div className="">


    </div>
    <div className="book-details-container">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate('/home')}>Home</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{book.title}</span>
      </div>
     

      <div className="book-main-info">
        <img className="book-covers" src={'/BookRataCover.jpeg'} alt={book.title} />
        <div className="book-info">
          <div className="book-header-row">
            <div>
              <h1>{book.title}</h1>
              <div className="book-authors">by {book.author}</div>
            </div>
            <button className="icon-btn share-btn" title="Share or Download">
              <i className="fa-solid fa-arrow-up-from-bracket"></i> 
            </button>
          </div>
          <div className="badges">
            <span
              className="book-details-tier-badge-main"
              style={{ background: TIER_COLORS[String(book.overallTier)] || TIER_COLORS.Other, color: String(book.overallTier) === '2' ? '#222' : '#fff' }}
            >
              Overall Tier: {book.overallTier}
              
            </span>
            <a href="#" className="ratings-guide-link"><img src="/brLogoRound.png" alt="" height={30}/> Ratings Guide</a>
          </div>
          <br />
          <div className="book-actions">
            
            <div className="book-tags">
              {Array.isArray(book.tagName) && book.tagName.length > 0 ? (
                book.tagName.map((tag: string | TagObject, idx: number) => {
                  if (typeof tag === 'string') {
                    return <span className="book-tag" key={tag}>{tag}</span>;
                  }
                  if (tag && typeof tag === 'object') {
                    return <span className="book-tag" key={tag.tagId || tag.tagName || idx}>
                      {tag.tagName || (typeof tag.toString === 'function' ? tag.toString() : '')}
                    </span>;
                  }
                  return null;
                })
              ) : (
                <span className="book-tag">No tags</span>
              )}
            </div>
          </div>
          <br />
          <h5>Book Summary:</h5>
          <div className="book-description">{book.bookSummary}</div>
        </div>
      </div>
      
      <div className="ai-rating-section">
        <div className="section-title">AI Rating Breakdown
         

        </div>
        <div className="review-date">
          AI Review Date {formatReviewDate(book.reviewDate) || 'N/A'}
        </div>

       
         
             
      
          
        <div className="accordion">
          {CATEGORIES.map(cat => (
            <AccordionItem
              key={cat.key}
              title={cat.label}
              tier={book[cat.key + 'Tier']}
              content={book[cat.key + 'Reasoning']}
            />
          ))}
        </div>
      </div>
    </div>
    </>
   
  );
}

export default BookDetails;
