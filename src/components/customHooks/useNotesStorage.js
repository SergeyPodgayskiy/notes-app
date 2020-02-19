import { useState, useEffect } from 'react';
import AsyncNotesStorage from '../../utils/AsyncNotesStorage';

const useNotesStorage = () => {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedNotes = await AsyncNotesStorage.getNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError(new Error('Failed to fetch notes. Please try to reload the page.'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    try {
      if (notes) {
        AsyncNotesStorage.setNotes(notes);
      }
    } catch (err) {
      setError(new Error('Failed to store notes. Please try again.'));
    }
  }, notes);

  return [notes, setNotes, isLoading, error];
};

export default useNotesStorage;
