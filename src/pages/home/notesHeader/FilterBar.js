import React from 'react';

const FilterBar = ({ filterText, onFilterTextChange }) => {
  return (
    <div className="notes-filter-bar">
      <input
        type="text"
        placeholder="Enter note's title"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
    </div>
  );
};

export default FilterBar;
