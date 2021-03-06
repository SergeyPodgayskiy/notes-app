import React from 'react';

const NoteItem = ({ value: note, activeNote, handleSetActiveNote }) => {
  if (!note) return null;

  const isActive = note.id === (activeNote && activeNote.id);

  return (
    <li className={`note-preview ${isActive ? 'active' : ''}`} onClick={e => handleSetActiveNote(note.id)}>
      <span className="note-preview__title">{note.title}</span>
    </li>
  );
};

export default NoteItem;
