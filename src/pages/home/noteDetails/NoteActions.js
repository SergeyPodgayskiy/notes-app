import React, { useState } from 'react';
import DeleteNoteModal from './DeleteNoteModal';
import Portal from '../../../components/Portal';
import useModalShowState from '../../../components/hooks/useModalShowState';

const NoteActions = ({ handleNoteDelete }) => {
  const [show, toggleShow] = useModalShowState(false);

  return (
    <div className="note-details-actions">
      <button className="btn btn--delete-note" onClick={toggleShow}>
        <span className="btn__text">Delete</span>
      </button>
      <Portal>
        <DeleteNoteModal show={show} handleClose={toggleShow} handleNoteDelete={handleNoteDelete} />
      </Portal>
    </div>
  );
};

export default NoteActions;
