import { useState, useEffect } from 'react';
import AsyncNotesStorage from '../../utils/AsyncNotesStorage';
// TODO: implement custom hook and thus decouple b-logic from UI

const useNotesStorage = (fetchDeps = []) => {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedNotes = await AsyncNotesStorage.fetchNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError(new Error('Failed to fetch the notes. Please try to reload the page.'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, fetchDeps);

  useEffect(() => {
    try {
      if (notes) {
        AsyncNotesStorage.persistNotes(notes);
      }
    } catch (err) {
      setError(new Error('Failed to save the notes. Please try again.'));
    }
  }, [notes]);

  return [notes, setNotes, isLoading, error];
};

export default useNotesStorage;
