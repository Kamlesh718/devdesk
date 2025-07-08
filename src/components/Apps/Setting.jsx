import { Moon, Sun, User, Trash2, Info } from "lucide-react";

import { useSetting } from "../../context/useSettings";
import { useNotes } from "../../hooks/useNotes";

function Setting() {
  const { theme, handleTheme, username, setUsername, handleSaveUsername } =
    useSetting();
  const { handleClearAllNotes } = useNotes();

  return (
    <div className="text-white w-full h-full p-4 space-y-6 bg-black/50 backdrop-blur-md rounded-md y-scroll-container">
      {/* Appearance */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sun className="w-5 h-5" /> Appearance
        </h2>
        <button
          onClick={handleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          {theme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          Switch to {theme ? "Light" : "Dark"} Mode
        </button>
      </section>

      {/* Personal Info */}
      <section className="space-y-2">
        <h2 className=" text-lg font-semibold flex gap-2">
          <User className="w-5 h-5" /> Personal Info
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="px-3 py-1 text-sm bg-white/10 border border-white/20 rounded-md outline-none text-white placeholder:text-white/40"
          />
          <button
            onClick={handleSaveUsername}
            className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </section>

      {/* Clear App Data */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Trash2 className="w-5 h-5" /> App Data
        </h2>
        <button
          onClick={handleClearAllNotes}
          className="text-red-400 border border-red-400 px-3 py-1 text-sm rounded hover:bg-red-600/20"
        >
          Clear Saved Notes
        </button>
      </section>

      {/* About */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Info className="w-5 h-5" /> About DevDesk
        </h2>
        <p className="text-sm text-zinc-300">
          DevDesk v1.0.0 – A browser-based mini operating system built with
          React, TailwindCSS, Redux, and motion animations.
          <br />
          <span className="text-zinc-400 italic">
            Made by Kamlesh Vishwakarma 🚀
          </span>
        </p>
      </section>
    </div>
  );
}

export default Setting;
