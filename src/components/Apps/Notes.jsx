import { X } from "lucide-react";
import { useNotes } from "../../hooks/useNotes";

function Notes() {
  const {
    noteName,
    noteContent,
    warning,
    setWarning,
    handleNoteName,
    handleNoteContent,
    handleSaveNote,
  } = useNotes();
  return (
    <>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter your note name"
          className="w-full p-2 border border-gray-500 rounded-md"
          value={noteName}
          onChange={handleNoteName}
          required
        />
        <button
          className="bg-green-400 rounded-sm px-5 py-1 text-gray-800"
          onClick={handleSaveNote}
        >
          Save
        </button>
      </div>
      {warning && (
        <div className="flex justify-between items-center gap-2 text-red-400 bg-red-400/10 border border-red-500/40 px-3 py-2 rounded-md text-sm mt-2 shadow-sm">
          <span>⚠️ Note: title and content are both required to save.</span>
          <button
            className="bg-gray-600 rounded-sm"
            onClick={() => setWarning(false)}
          >
            <X />
          </button>
        </div>
      )}

      <div
        className="rounded-md shadow-lg w-full h-full mt-2 bg-zinc-900/70 backdrop-blur-md border border-white/10 transition-all"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        <textarea
          className="w-full h-full text-sm leading-relaxed font-medium bg-transparent resize-none outline-none text-white placeholder:text-zinc-400 p-2 rounded-md focus:ring-1 focus:ring-blue-400 transition"
          value={noteContent}
          onChange={handleNoteContent}
          placeholder="Start typing your note here..."
        />
      </div>
    </>
  );
}

export default Notes;
