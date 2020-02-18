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
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, fetchDeps);

  useEffect(() => {
    AsyncNotesStorage.saveNotes(notes);
  }, [notes]);

  return [notes, isLoading, error];
};

export default useNotesStorage;
