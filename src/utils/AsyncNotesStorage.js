const AsyncNotesStorage = {
  fetchNotes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notes = JSON.parse(window.localStorage.getItem('notes'));
        notes = notes && Array.isArray(notes) ? notes : [];
        resolve(notes);
      }, 1000);
    });
  },

  persistNotes(notes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        window.localStorage.setItem('notes', JSON.stringify(notes));
        resolve([...notes]);
      }, 0);
    });
  },
};

export default AsyncNotesStorage;
