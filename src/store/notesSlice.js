import { createSlice } from "@reduxjs/toolkit";

// notesSlice.js
const initialState = {
  noteName: "",
  noteContent: "",
  saveNotes: [],
  // other state
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Called when the note save for first time
    saveNote: (state, action) => {
      state.saveNotes = [...state.saveNotes, action.payload];
      state.noteName = "";
      state.noteContent = "";
    },

    setNoteName: (state, action) => {
      state.noteName = action.payload;
    },
    setNoteContent: (state, action) => {
      state.noteContent = action.payload;
    },
    // While Updating the notes call this function to update the saveNotes STATE
    setSavedNote: (state, action) => {
      state.saveNotes = action.payload;
    },

    resetNotes: () => initialState,
    // other reducers
  },
});

export const {
  saveNote,
  setNoteName,
  setNoteContent,
  setSavedNote,
  resetNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
