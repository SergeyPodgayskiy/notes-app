import React, { useRef, useEffect } from 'react';
import NoteActions from './noteDetails/NoteActions';
import TextareaAutosize from 'react-textarea-autosize';

const NoteDetails = React.forwardRef(({ note, handleNoteDetailsChange, handleNoteDelete }, ref) => {
  const textarea = useRef();

  return (
    <div className="note-details-container">
      <NoteActions handleNoteDelete={handleNoteDelete} noteId={note.id} />
      <TextareaAutosize
        inputRef={innerTextarea => (ref.current = innerTextarea)}
        className="note-details-content"
        value={note.details}
        onChange={e => handleNoteDetailsChange(note.id, e.target.value)}
      />
    </div>
  );
});

export default NoteDetails;
