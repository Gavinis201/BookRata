import React, { useState } from 'react';
import './BookFilters.css'; // Assuming you have a CSS file for styling

const TAG_OPTIONS = [
  "Fiction", "Nonfiction", "Mystery", "Romance", "Fantasy", "Biography", "History", "Science", "Children", "Young Adult"
];

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
}

function BookFilters({ onAuthorSearch }: BookFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState('');

  const [overallTier, setOverallTier] = useState<'Any' | number>('Any');
  const [categoryTiers, setCategoryTiers] = useState<Record<string, 'Any' | number>>({
    language: 'Any',
    sexuality: 'Any',
    violence: 'Any',
    drugs: 'Any',
    lgbtq: 'Any',
    religion: 'Any',
  });

  // Filter tags based on input and not already selected
  const filteredTags = TAG_OPTIONS.filter(
    tag =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowDropdown(!!e.target.value);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput('');
      setShowDropdown(false);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleCategoryTier = (cat: string, value: 'Any' | number) => {
    setCategoryTiers(prev => ({ ...prev, [cat]: value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchAuthor(value);
    onAuthorSearch(value);
  };

  return (
    <>
      <form className="book-filters-form" >
        <p className='filter-label'>Advanced Filter</p>
        <input 
          className="filter-input" 
          type="text" 
          placeholder="Author" 
          value={searchAuthor}
          onChange={handleAuthorChange}
        />
        <div className="tag-autocomplete-wrapper">
          <input
            className="filter-input"
            type="text"
            placeholder="Search tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onFocus={() => setShowDropdown(!!tagInput)}
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
        <button className="filter-btn d-flex justify-content-center align-items-center" type="submit">
          <i className="fas fa-search"></i> Search
        </button>
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
          <div className="filter-label" >Categories</div>
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