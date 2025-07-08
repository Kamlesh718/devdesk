import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSavedNote } from "../../store/notesSlice";
import { Edit3Icon, NotepadTextIcon, Trash2 } from "lucide-react";
import { useSavedNotes } from "../../hooks/useSavedNotes";

function SavedNotes() {
  const {
    editingNoteId,
    setEditingNoteId,
    setEditedTitle,
    editedTitle,
    editedContent,
    setEditedContent,
    deleteSaveNote,
    handleSaveEdit,
    saveNotes,
  } = useSavedNotes();
  return (
    <>
      {saveNotes.length === 0 ? (
        <span className="text-sm italic">No saved Notes</span>
      ) : (
        saveNotes.map((sn) => (
          <section
            key={sn.id}
            className="px-3 my-3 py-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 text-sm text-white transition flex flex-col"
          >
            {editingNoteId === sn.id ? (
              <>
                <input
                  className="bg-transparent border-b border-zinc-500 mb-2 outline-none"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="bg-transparent resize-none h-24 outline-none border border-zinc-500 p-2"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    className="text-xs text-green-400 hover:underline"
                    onClick={() => handleSaveEdit(sn.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-xs text-red-400 hover:underline"
                    onClick={() => setEditingNoteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <span className="flex items-center gap-2">
                    <NotepadTextIcon className="w-4 h-4" />
                    {sn.title}
                  </span>
                  <div className="flex gap-2">
                    <Trash2
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => deleteSaveNote(sn.id)}
                    />
                    <Edit3Icon
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => {
                        setEditingNoteId(sn.id);
                        setEditedTitle(sn.title);
                        setEditedContent(sn.content);
                      }}
                    />
                  </div>
                </div>
                <p className="mt-2">{sn.content}</p>
              </>
            )}
          </section>
        ))
      )}
    </>
  );
}

export default SavedNotes;
