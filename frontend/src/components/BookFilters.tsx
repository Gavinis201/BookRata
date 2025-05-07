import React, { useState } from 'react';
import './BookFilters.css'; // Assuming you have a CSS file for styling

const TAG_OPTIONS = [
  "Fiction", "Nonfiction", "Mystery", "Romance", "Fantasy", "Biography", "History", "Science", "Children", "Young Adult"
];

function BookFilters() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    
    <form className="filter-container" autoComplete="off">
      <input className="filter-input" type="text" placeholder="Title" />
      <input className="filter-input" type="text" placeholder="Author" />
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
      <button className="filter-btn" type="submit">
        <i className="fas fa-search"></i> Search
      </button>
    </form>
  );
}

export default BookFilters;