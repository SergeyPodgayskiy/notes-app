import React from 'react';
import NotePreview from './notes/NotePreview';

const Notes = ({ filterText, notes, handleSetActiveNote }) => {
  const nonEmptyNotesList = notes && notes.length > 0;
  const notesElements = nonEmptyNotesList
    ? notes.map(note => <NotePreview key={note.id} value={note} handleSetActiveNote={handleSetActiveNote} />)
    : null;

  return <ul className="notes-preview-list">{nonEmptyNotesList ? notesElements : <div>There are no notes</div>}</ul>;
};

export default Notes;
