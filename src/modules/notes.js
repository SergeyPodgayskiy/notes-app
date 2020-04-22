const initialState = {
  notes: null,
  isLoading: false,
  error: null,
};

function reducer(state = initialState, [type, payload]) {
  switch (type) {
    case 'notes.fetching':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'notes.fetchSuccess':
      return {
        notes: [...payload.notes],
        isLoading: false,
        error: null,
      };
    case 'notes.fetchFail':
      return {
        ...state,
        isLoading: false,
        error: { ...payload.error },
      };
    case 'notes.persistSuccess':
      console.log('reducer', payload);
      return {
        notes: [...payload.notes],
        isLoading: false,
        error: null,
      };
    case 'notes.persistFail':
      return {
        ...state,
        isLoading: false,
        error: { ...payload.error },
      };
    default:
      return state;
  }
}

export default reducer;
