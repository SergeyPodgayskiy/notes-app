import React, {useContext, useEffect, useRef, useState} from 'react';
import NotesHeader from './home/NotesHeader';
import NotesList from './home/NotesList';
import NoteDetails from './home/NoteDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {ThemeContext} from '../context/ThemeContext';
import ErrorBoundary from '../components/errorBoudaries/ErrorBoundary';
import AsyncNotesStorage from '../utils/AsyncNotesStorage';

const Home = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      return await AsyncNotesStorage.getNotes();
    }
    setIsLoading(true);
      fetchNotes()
          .then(notes => {
            setNotes(notes);
            setFilteredNotes(filterNotes(filterText, notes));
            const activeNote = notes && notes.length > 0 ? notes[0] : null;
            setActiveNote(activeNote);
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
  }, []);

  useEffect(() => {
    AsyncNotesStorage.setNotes(notes);
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
    setActiveNote({...notes.find(note => note.id === selectedNoteId)});
  };

  const handleNoteDetailsAdd = noteTitle => {
    //TODO: add validation
    if (!noteTitle) return;

    let newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      details: '',
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setFilteredNotes(filterNotes(filterText, newNotes));
    setActiveNote(newNote);
  };

  const handleNoteDetailsChange = text => {
    if (activeNote) {
      activeNote.details = text;
      const newNotes = [...notes];
      newNotes.find(note => note.id === activeNote.id).details = text;
      setNotes(newNotes);
      setFilteredNotes(filterNotes(filterText, newNotes));
    }
  };

  const handleNoteDelete = () => {
    if (activeNote) {
      const activeNoteAmongNotes = notes.find(note => note.id === activeNote.id);
      const prevNote = notes[notes.indexOf(activeNoteAmongNotes) - 1];
      const newNotes = notes.filter(note => note.id !== activeNoteAmongNotes.id);

      if (prevNote) {
        setNotes(newNotes);
        setFilteredNotes(filterNotes(filterText, newNotes));
        setActiveNote({ ...prevNote });
        return;
      }

      const isFirstElementWasDeleted = !prevNote && newNotes.length > 0;
      if (isFirstElementWasDeleted) {
        setNotes(newNotes);
        setFilteredNotes(filterNotes(filterText, newNotes));
        setActiveNote(newNotes[0]);
      } else {
        setNotes([]);
        setFilteredNotes([]);
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
              isLoading={isLoading}
            />
            <NotesList
              filterText={filterText}
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
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default Home;
