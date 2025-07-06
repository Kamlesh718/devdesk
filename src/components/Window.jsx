import { Rnd } from "react-rnd";
import { X, Minus } from "lucide-react";
import { motion } from "motion/react";
import { iconMap } from "../utils/iconsMaps";
import { useDispatch } from "react-redux";
import { bringToFront } from "../store/windowsManagerSlice";

export default function Window({ title, id, onClose, onMinimize, children }) {
  const Icon = iconMap[id];
  const dispatch = useDispatch();

  const getWindowSize = (id) => {
    if (["paint", "space_explorer_game", "react_code_editor"].includes(id)) {
      return { width: 1500, height: 800 };
    } else if (
      ["portfolio", "chitramitra", "solar_system", "wallpaper"].includes(id)
    )
      return { width: 950, height: 770 };

    return { width: 500, height: 400 };
  };
  const { width, height } = getWindowSize(id);

  return (
    <Rnd
      default={{
        x: Math.floor(Math.random() * (300 - 100 + 1)) + 100,
        y: Math.floor(Math.random() * (300 - 200 + 1)) + 100,
        width: width,
        height: height,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      className="z-30"
      dragHandleClassName="window-title-bar"
      onDragStart={() => dispatch(bringToFront(id))}
      onMouseDown={() => dispatch(bringToFront(id))}
    >
      <motion.div
        className={`flex flex-col w-full h-full ${
          id === "react_code_editor"
            ? "bg-zinc-900/50 border-black"
            : "bg-zinc-900/90 backdrop-blur-lg border-white/10"
        } rounded-md shadow-xl border  overflow-hidden`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        {/* Title Bar */}
        <div className="window-title-bar flex items-center justify-between px-3 py-2 bg-zinc-800/70 border-b border-zinc-700 cursor-move">
          <h2 className="text-sm font-medium flex gap-2 items-center">
            <Icon />
            {title}
          </h2>
          <div className="flex gap-2">
            <button onClick={onMinimize}>
              <Minus className="w-4 h-4" />
            </button>

            <button onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 y-scroll-container ">{children}</div>
      </motion.div>
    </Rnd>
  );
}
