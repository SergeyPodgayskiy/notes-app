import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import NotesHeader from './home/NotesHeader';
import Notes from './home/Notes';
import NoteDetails from './home/NoteDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';
import ErrorBoundary from '../components/errorBoudaries/ErrorBoundary';

const Home = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const notesStorage = useRef();

  const initNotesStorage = () => {
    notesStorage.current = window.localStorage;
    const notesFromStorage = JSON.parse(notesStorage.current.getItem('notes'));
    const notes = notesFromStorage && Array.isArray(notesFromStorage) ? notesFromStorage : [];
    return notes;
  };

  const [notes, setNotes] = useState(initNotesStorage());
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [activeNote, setActiveNote] = useState({});
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const activeNote = notes.find(note => note.isActive === true);
    setActiveNote({ ...activeNote });
  }, []);

  useEffect(() => {
    console.log('Called every time when notes get mounted and updated');
    notesStorage.current.setItem('notes', JSON.stringify(notes));
    setFilteredNotes(filterNotes(filterText, notes));
  }, [notes]);

  const handleFilterTextChange = filterText => {
    //TODO: add validation
    setFilterText(filterText);
    const updatedFilteredNotes = filterNotes(filterText, notes);
    setFilteredNotes(updatedFilteredNotes);
  };

  const filterNotes = (filterText, notes) => {
    const processedFilteredText = filterText.trim().toLowerCase();

    if (processedFilteredText === '') return notes;

    return filteredNotes.filter(note => {
      const processedTitle = note.title.trim().toLowerCase();
      return processedTitle.includes(processedFilteredText);
    });
  };

  const textareaElement = useRef();
  useLayoutEffect(() => {
    textareaElement.current.focus();
  }, [activeNote]);

  const handleSetActiveNote = selectedNoteId => {
    const newNotes = notes.map(note => ({ ...note, isActive: note.id === selectedNoteId }));
    setNotes(newNotes);
    setActiveNote(newNotes.find(note => note.id === selectedNoteId));
  };

  const handleNoteDetailsAdd = noteTitle => {
    //TODO: add validation
    if (!noteTitle) return;

    let newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      details: '',
      isActive: true,
    };
    let newNotes = [...notes, newNote];
    newNotes.forEach(note => (note.isActive = note.id === newNote.id));
    setNotes(newNotes);
    setActiveNote(newNotes.find(note => note.id === newNote.id));
  };

  const handleNoteDetailsChange = (selectedNoteId, text) => {
    let newNotes = [...notes];
    let selectedNote = newNotes.find(note => note.id === selectedNoteId);
    selectedNote.details = text;
    setNotes(newNotes);
  };

  const handleNoteDelete = selectedNoteId => {
    let newNotes = notes
      .filter(note => note.id !== selectedNoteId)
      .forEach((note, index) => (note.isActive = index === 0));
    setNotes(newNotes);
    setActiveNote(newNotes[0]);
  };

  return (
    <div className="container">
      <Header />
      <ErrorBoundary>
        <main className="main-notes-container">
          <div className="left-side-container" style={{ backgroundColor: `${theme.primaryColor}` }}>
            <NotesHeader
              filterText={filterText}
              onFilterTextChange={handleFilterTextChange}
              handleNoteDetailsAdd={handleNoteDetailsAdd}
            />
            <Notes filterText={filterText} notes={filteredNotes} handleSetActiveNote={handleSetActiveNote} />
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
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default Home;
