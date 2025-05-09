import React, { use, useEffect, useState } from 'react';
import './BookFilters.css'; // Assuming you have a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TIER_OPTIONS = [1, 2, 3, 4, 5];

const CATEGORY_FILTERS = [
  { key: 'language', label: 'Language' },
  { key: 'sexuality', label: 'Sexuality' },
  { key: 'violence', label: 'Violence' },
  { key: 'drugs', label: 'Drugs' },
  { key: 'lgbtq', label: 'LGBTQ+' },
  { key: 'religion', label: 'Religion' },
];

interface BookFiltersProps {
  onAuthorSearch: (author: string) => void;
  onTagFilter: (tags: string[]) => void;
}

function BookFilters({ onAuthorSearch, onTagFilter }: BookFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);

  const [overallTier, setOverallTier] = useState<'Any' | number>('Any');
  const [categoryTiers, setCategoryTiers] = useState<Record<string, 'Any' | number>>({
    language: 'Any',
    sexuality: 'Any',
    violence: 'Any',
    drugs: 'Any',
    lgbtq: 'Any',
    religion: 'Any',
  });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('https://localhost:5000/Book/BookAuthors');
        if (!response.ok) throw new Error('Failed to fetch authors');
        const data = await response.json();
        console.log('Fetched authors:', data);
        setAvailableAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('https://localhost:5000/Book/Tags');
        if (!response.ok) throw new Error('Failed to fetch tags');
        const data = await response.json();
        setAvailableTags(data.map((tag: { tagName: string }) => tag.tagName));
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Filter tags based on input and not already selected
  const filteredTags = availableTags.filter(
    tag =>
      (tagInput === '' || tag.toLowerCase().includes(tagInput.toLowerCase())) &&
      !selectedTags.includes(tag)
  );

  // Filter authors based on input
  const filteredAuthors = availableAuthors.filter(
    author => author.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowDropdown(true);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && filteredTags.length > 0) {
      e.preventDefault(); // Prevent default tab behavior
      const firstTag = filteredTags[0];
      handleTagSelect(firstTag);
    }
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.length < 5) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      onTagFilter(newTags);
      setTagInput('');
      setShowDropdown(false);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    onTagFilter(newTags);
  };

  const handleCategoryTier = (cat: string, value: 'Any' | number) => {
    setCategoryTiers(prev => ({ ...prev, [cat]: value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchAuthor(value);
    setShowAuthorDropdown(true);
    // Reset book list when search is empty
    if (value === '') {
      onAuthorSearch('');
    }
  };

  const handleAuthorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && filteredAuthors.length > 0) {
      e.preventDefault(); // Prevent default tab behavior
      const firstAuthor = filteredAuthors[0];
      setSearchAuthor(firstAuthor);
      onAuthorSearch(firstAuthor);
      setShowAuthorDropdown(false);
    }
  };

  const handleAuthorSelect = (author: string) => {
    setSearchAuthor(author);
    onAuthorSearch(author);
    setShowAuthorDropdown(false);
  };

  const handleClearAuthor = () => {
    setSearchAuthor('');
    onAuthorSearch('');
  };

  return (
    <>
      <form className="book-filters-form" onSubmit={(e) => e.preventDefault()}>
        <p className='filter-label'>Advanced Filter</p>
        <div className="author-autocomplete-wrapper">
          <div className="input-with-clear">
            <input 
              className="filter-input" 
              type="text" 
              placeholder="Search by author..." 
              value={searchAuthor}
              onChange={handleAuthorChange}
              onKeyDown={handleAuthorKeyDown}
              onFocus={() => setShowAuthorDropdown(true)}
              onBlur={() => setTimeout(() => setShowAuthorDropdown(false), 150)}
            />
            {searchAuthor && (
              <button 
                className="clear-button" 
                onClick={handleClearAuthor}
                type="button"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          {showAuthorDropdown && filteredAuthors.length > 0 && (
            <ul className="author-dropdown">
              {filteredAuthors.map(author => (
                <li key={author} onClick={() => handleAuthorSelect(author)}>
                  {author}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="tag-autocomplete-wrapper">
          <input
            className="filter-input"
            type="text"
            placeholder="Search tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && filteredTags.length > 0 && (
            <ul className="tag-dropdown">
              {filteredTags.map(tag => (
                <li key={tag} onClick={() => handleTagSelect(tag)}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="selected-tags">
            {selectedTags.map(tag => (
              <span className="tag-chip" key={tag}>
                {tag}
                <button className="remove-tag" onClick={() => removeTag(tag)}>&times;</button>
              </span>
            ))}
          </div>
        </div>
      </form>

      <div className="sidebar-filters">
        <div className="filter-section">
          <div className="filter-label">Overall Tier</div>
          <div className="tier-btn-group">
            <button
              className={overallTier === 'Any' ? 'tier-btn active' : 'tier-btn'}
              onClick={() => setOverallTier('Any')}
            >Any</button>
            {TIER_OPTIONS.map(tier => (
              <button
                key={tier}
                className={overallTier === tier ? 'tier-btn active' : 'tier-btn'}
                onClick={() => setOverallTier(tier)}
              >{tier}</button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <div className="filter-label">Categories</div>
          {CATEGORY_FILTERS.map(cat => (
            <div key={cat.key} className="category-row">
              <span className="category-label">{cat.label}</span>
              <div className="tier-btn-group">
                <button
                  className={categoryTiers[cat.key] === 'Any' ? 'tier-btn active' : 'tier-btn'}
                  onClick={() => handleCategoryTier(cat.key, 'Any')}
                >Any</button>
                {TIER_OPTIONS.map(tier => (
                  <button
                    key={tier}
                    className={categoryTiers[cat.key] === tier ? 'tier-btn active' : 'tier-btn'}
                    onClick={() => handleCategoryTier(cat.key, tier)}
                  >{tier}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a href="#" className="ratings-guide-link">See Ratings Guide</a>
      </div>
    </>
  );
}

export default BookFilters;