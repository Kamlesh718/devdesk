import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSavedNote } from "../store/notesSlice";

export function useSavedNotes() {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const dispatch = useDispatch();

  const saveNotesFromStore = useSelector((state) => state.notes.saveNotes);
  const saveNotes =
    saveNotesFromStore !== undefined && saveNotesFromStore !== null
      ? saveNotesFromStore
      : JSON.parse(localStorage.getItem("notes")) || [];

  // console.log(saveNotes);
  const deleteSaveNote = (id) => {
    const updatedNotes = saveNotes.filter((sn) => sn.id !== id);
    dispatch(setSavedNote(updatedNotes));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleSaveEdit = (id) => {
    const updatedNotes = saveNotes.map((note) =>
      note.id === id
        ? { ...note, title: editedTitle, content: editedContent }
        : note
    );

    dispatch(setSavedNote(updatedNotes));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditingNoteId(null);
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    dispatch(setSavedNote(notes));
  }, [dispatch]);

  return {
    editingNoteId,
    setEditingNoteId,
    setEditedTitle,
    editedTitle,
    editedContent,
    setEditedContent,
    deleteSaveNote,
    handleSaveEdit,
    saveNotes,
  };
}
