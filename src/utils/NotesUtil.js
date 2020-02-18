export const filterNotes = (filterText, notesToFilter) => {
  const processedFilteredText = filterText.trim().toLowerCase();

  if (processedFilteredText === '') return notesToFilter;

  const filteredNotes = notesToFilter.filter(note => {
    const processedTitle = note.title.trim().toLowerCase();
    return processedTitle.includes(processedFilteredText);
  });

  return filteredNotes;
};

export const defineActiveNote = (notes, selectedNoteId) => {
  if (!notes) return null;

  if (!selectedNoteId) return { ...notes[0] };

  return { ...notes.find(note => note.id === selectedNoteId) };
};
