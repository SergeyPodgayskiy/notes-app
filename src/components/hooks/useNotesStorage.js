import { useEffect, useReducer } from 'react';
import asyncNotesStorage from '../../utils/asyncNotesStorage';
import notesReducer from '../../modules/notes';

const initialState = {
  notes: null,
  isLoading: false,
  error: null,
};

const useNotesStorage = () => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { notes, isLoading, error } = state;

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(['notes.fetching']);
      try {
        const fetchedNotes = await asyncNotesStorage.fetchNotes();
        dispatch(['notes.fetchSuccess', { notes: fetchedNotes }]);
      } catch (err) {
        dispatch(['notes.fetchFail', { error: new Error('Failed to fetch notes. Please try to reload the page.') }]);
      }
    };
    fetchNotes();
  }, []);

  const persistNotes = async notesToPersist => {
    try {
      await asyncNotesStorage.persistNotes(notesToPersist);
      dispatch(['notes.persistSuccess', { notes: notesToPersist }]);
    } catch (err) {
      dispatch(['notes.persistFail', { error: new Error('Failed to store notes. Please try again.') }]);
    }
  };

  return [notes, persistNotes, isLoading, error];
};

export default useNotesStorage;
