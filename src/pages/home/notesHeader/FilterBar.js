import React from 'react';

const FilterBar = ({ filterText, onFilterTextChange, isLoading }) => {
  return (
    <div className="notes-filter-bar">
      <input
        type="text"
        placeholder="Enter note's title"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );
};

export default FilterBar;
