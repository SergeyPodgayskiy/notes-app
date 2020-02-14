import React from 'react';

const Note = ({ value: note, handleSetActiveNote }) => {
  return (
    <li className={`note-preview ${note.isActive ? 'active' : ''}`} onClick={e => handleSetActiveNote(note.id)}>
      <span className="note-preview__title">{note.title}</span>
    </li>
  );
};

export default Note;
