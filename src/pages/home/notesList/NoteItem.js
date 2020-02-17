import React from 'react';

const NoteItem = ({ value: note, activeNote, handleSetActiveNote }) => {
  return (
    <li className={`note-preview ${note.id === (activeNote && activeNote.id) ? 'active' : ''}`} onClick={e => handleSetActiveNote(note.id)}>
      <span className="note-preview__title">{note.title}</span>
    </li>
  );
};

export default NoteItem;
