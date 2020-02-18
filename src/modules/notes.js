import AsyncNotesStorage from '../utils/AsyncNotesStorage';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'notes.fetching':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'notes.fetchSuccess':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case 'notes.fetchFailure':
      return {
        ...state,
        isLoading: false,
      };
    case 'notes.adding':
      return {};
    case 'notes.addSuccess':
      return {};
    case 'notes.addFailure':
      return {};
    default:
      return state;
  }
}

// actions
export function fetchNotes() {
  return async dispatch => {
    dispatch({ type: 'notes.fetching' });
    try {
      const notes = await AsyncNotesStorage.fetchNotes();
      dispatch({ type: 'notes.fetchSuccess', notes });
    } catch (error) {
      dispatch({ type: 'notes.fetchFailure', error });
    }
  };
}

export function addNote(note) {
  return async dispatch => {
    dispatch({ type: 'notes.adding' });
    await AsyncNotesStorage.saveNotes();
  };
}
