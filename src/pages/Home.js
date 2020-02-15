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

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const notes = initNotesStorage();
    const activeNote = notes.find(note => note.isActive === true);
    setNotes(notes);
    setActiveNote({ ...activeNote });
  }, []);

  useEffect(() => {
    console.log('Called every time when notes get mounted and updated');
    //console.log('Notes:', notes);
    //console.log('Active Note', activeNote);
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
  useEffect(() => {
    const currentTextareElement = textareaElement.current;
    if (currentTextareElement) {
      currentTextareElement.focus();
    }
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
    const newNotes = [...notes, newNote];
    let activeNote = null;
    newNotes.forEach(note => {
      const isSelected = note.id === newNote.id;
      note.isActive = isSelected;
      activeNote = isSelected ? note : null;
    });
    setNotes(newNotes);
    setActiveNote(activeNote);
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
      const prevNote = notes[notes.indexOf(activeNote) - 1];
      const newNotes = notes.filter(note => note.id !== activeNote.id);

      if (prevNote) {
        newNotes.forEach(note => (note.isActive = note.id === prevNote.id));
        setNotes(newNotes);
        setActiveNote({ ...prevNote });
        return;
      }

      const isFirstElementWasDeleted = !prevNote && newNotes.length > 0;
      if (isFirstElementWasDeleted) {
        newNotes.forEach((note, index) => (note.isActive = index === 0));
        setNotes(newNotes);
        setActiveNote(newNotes[0]);
      } else {
        setNotes([]);
        setActiveNote(null);
      }
    }
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
