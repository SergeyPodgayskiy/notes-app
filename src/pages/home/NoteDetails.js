import React, { useRef, useEffect } from 'react';
import NoteActions from './noteDetails/NoteActions';
import TextareaAutosize from 'react-textarea-autosize';

const NoteDetails = React.forwardRef(({ note, handleNoteDetailsChange, handleNoteDelete }, ref) => {
  if (!note) return <div style={{ marginTop: '25%' }}>There is no selected note</div>;

  return (
    <div className="note-details-container">
      <NoteActions handleNoteDelete={handleNoteDelete} />
      <TextareaAutosize
        inputRef={innerTextarea => (ref.current = innerTextarea)}
        className="note-details-content"
        value={note.details}
        onChange={e => handleNoteDetailsChange(e.target.value)}
      />
    </div>
  );
});

export default NoteDetails;
