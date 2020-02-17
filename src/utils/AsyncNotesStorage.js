const AsyncNotesStorage = {
  getNotes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notes = JSON.parse(window.localStorage.getItem('notes'));
        notes = notes && Array.isArray(notes) ? notes : [];
        resolve(notes);
      }, 1000);
    });
  },

  setNotes(notes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        window.localStorage.setItem('notes', JSON.stringify(notes));
        resolve();
      }, 1000);
    });
  },
};

export default AsyncNotesStorage;
