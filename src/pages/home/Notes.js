import React from 'react';
import NotePreview from './notes/NotePreview';

const Notes = ({ filterText, notes, handleSetActiveNote, isLoading, error, activeNote }) => {
  if (isLoading) return <div>Fetching notes. . . </div>;

  if (error) return <div>{error}</div>;

  const nonEmptyNotesList = notes && notes.length > 0;
  const notesElements = nonEmptyNotesList
    ? notes.map(note => <NotePreview key={note.id} value={note} activeNote={activeNote} handleSetActiveNote={handleSetActiveNote} />)
    : null;

  return <ul className="notes-preview-list">{nonEmptyNotesList ? notesElements : <div>There are no notes</div>}</ul>;
};

export default Notes;
