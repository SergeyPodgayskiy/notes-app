import { useState, useEffect } from 'react';
// TODO: implement custom hook and thus decouple b-logic from UI
const useNotesFromStorage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const notes = await AsyncNotesStorage.getNotes();
        setNotes(notes);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return [notes, isLoading, error];
};
