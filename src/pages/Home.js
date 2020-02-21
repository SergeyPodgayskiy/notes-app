import React, { useContext, useEffect, useRef, useState } from 'react';
import NotesHeader from './home/NotesHeader';
import NotesList from './home/NotesList';
import NoteDetails from './home/NoteDetails';
import { ThemeContext } from '../context/ThemeContext';
import useNotesStorage from '../components/hooks/useNotesStorage';
import { filterNotes, defineActiveNote } from '../utils/NotesUtil';

const Home = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [notes, setNotes, isLoading, error] = useNotesStorage();
  const [activeNote, setActiveNote] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');
  const textareaElement = useRef();

  const filteredNotes = filterNotes(filterTerm, notes);

  useEffect(() => {
    if (!notes) return setActiveNote(null);

    if (!activeNote) {
      setActiveNote(defineActiveNote(notes));
    }
  }, [notes]);

  useEffect(() => {
    const currentTextareaElement = textareaElement.current;

    if (currentTextareaElement) {
      currentTextareaElement.focus();
    }
  }, [activeNote]);

  const handleFilterTermChange = term => {
    // TODO: add validation
    setFilterTerm(term);
    setActiveNote(null);
  };

  const handleSetActiveNote = selectedNoteId => {
    setActiveNote(defineActiveNote(notes, selectedNoteId));
  };

  const handleNoteDetailsAdd = noteTitle => {
    // TODO: add validation
    if (!noteTitle) return;

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      details: '',
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setActiveNote(newNote);
  };

  const handleNoteDetailsChange = text => {
    if (activeNote) {
      activeNote.details = text;
      const newNotes = [...notes];
      newNotes.find(note => note.id === activeNote.id).details = text;
      setNotes(newNotes);
    }
  };

  const handleNoteDelete = () => {
    if (activeNote) {
      const activeNoteAmongNotes = notes.find(note => note.id === activeNote.id);
      const prevNote = notes[notes.indexOf(activeNoteAmongNotes) - 1];
      const newNotes = notes.filter(note => note.id !== activeNoteAmongNotes.id);

      if (prevNote) {
        setNotes(newNotes);
        setActiveNote({ ...prevNote });
        return;
      }

      const isFirstNoteWasDeleted = !prevNote && newNotes.length > 0;
      if (isFirstNoteWasDeleted) {
        setNotes(newNotes);
        setActiveNote(newNotes[0]);
      } else {
        setNotes(null);
        setActiveNote(null);
      }
    }
  };

  return (
    <main className="main-notes-container">
      <div className="left-side-container" style={{ backgroundColor: `${theme.primaryColor}` }}>
        <NotesHeader
          filterTerm={filterTerm}
          onFilterTermChange={handleFilterTermChange}
          handleNoteDetailsAdd={handleNoteDetailsAdd}
          isLoading={isLoading}
        />
        <NotesList
          notes={filteredNotes}
          handleSetActiveNote={handleSetActiveNote}
          isLoading={isLoading}
          error={error}
          activeNote={activeNote}
        />
      </div>
      <div className="right-side-container" style={{ backgroundColor: `${theme.primaryColor}` }}>
        <NoteDetails
          note={activeNote}
          handleNoteDetailsChange={handleNoteDetailsChange}
          handleNoteDelete={handleNoteDelete}
          ref={textareaElement}
        />
      </div>
    </main>
  );
};

export default Home;
