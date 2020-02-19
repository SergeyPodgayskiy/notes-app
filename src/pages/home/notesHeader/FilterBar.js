import React from 'react';

const FilterBar = ({ filterTerm, onFilterTermChange, isLoading }) => {
  return (
    <div className="notes-filter-bar">
      <input
        type="text"
        placeholder="Enter note's title"
        value={filterTerm}
        onChange={e => onFilterTermChange(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );
};

export default FilterBar;
