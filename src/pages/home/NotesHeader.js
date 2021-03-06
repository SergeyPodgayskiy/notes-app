import React, { useState } from 'react';
import FilterBar from './notesHeader/FilterBar';
import Portal from '../../components/Portal';
import AddNoteModal from './notesHeader/AddNoteModal';
import useModalShowState from '../../components/hooks/useModalShowState';

const NotesHeader = ({ filterTerm, onFilterTermChange, handleNoteDetailsAdd, isLoading }) => {
  const [show, toggleShow] = useModalShowState(false);

  return (
    <div
      className="notes-header-container"
      onClick={e => console.log('Check bubble from Portal. Clicked on:', e.target)}
    >
      <button onClick={toggleShow} className="btn btn--add-note" disabled={isLoading}>
        <span className="btn__text">Add note</span>
      </button>
      <FilterBar filterTerm={filterTerm} onFilterTermChange={onFilterTermChange} isLoading={isLoading} />
      <Portal>
        <AddNoteModal show={show} handleClose={toggleShow} handleNoteDetailsAdd={handleNoteDetailsAdd} />
      </Portal>
    </div>
  );
};

export default NotesHeader;
