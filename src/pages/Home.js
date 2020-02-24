import React, { useContext } from 'react';
import NotesHeader from './home/NotesHeader';
import NotesList from './home/NotesList';
import NoteDetails from './home/NoteDetails';
import useHomeContainer from './home/hooks/useHomeContainer';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const {
    filteredNotes,
    filterTerm,
    isLoading,
    activeNote,
    textareaElement,
    error,
    handleFilterTermChange,
    handleNoteDetailsAdd,
    handleSetActiveNote,
    handleNoteDetailsChange,
    handleNoteDelete,
  } = useHomeContainer();

  return (
    <div className="main-notes-container">
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
    </div>
  );
};

export default Home;
