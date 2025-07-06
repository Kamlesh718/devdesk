import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNote, setNoteContent, setNoteName } from "../store/notesSlice";

export function useNotes() {
  const noteName = useSelector((state) => state.notes.noteName);
  const noteContent = useSelector((state) => state.notes.noteContent);
  const saveNotes = useSelector((state) => state.notes.saveNotes);
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);

  const handleNoteName = (e) => {
    const value = e.target.value;
    dispatch(setNoteName(value));
  };

  const handleNoteContent = (e) => {
    const value = e.target.value;
    dispatch(setNoteContent(value));
  };

  const handleSaveNote = () => {
    // e.preventDefault();
    if (!noteName.trim() || !noteContent.trim()) {
      setWarning(true);
      return;
    }

    const newNote = {
      id: Date.now(),
      title: noteName,
      content: noteContent,
    };
    dispatch(saveNote(newNote));
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(saveNotes));
  }, [saveNotes]);

  useEffect(() => {
    if (warning) {
      const timeout = setTimeout(() => setWarning(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [warning]);

  return {
    noteName,
    noteContent,
    saveNotes,
    warning,
    setWarning,
    handleNoteName,
    handleNoteContent,
    handleSaveNote,
  };
}
