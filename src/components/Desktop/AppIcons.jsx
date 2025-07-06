import { useDispatch } from "react-redux";
import { openApp } from "../../store/windowsManagerSlice";
import {
  Calculator,
  Clock,
  Code2,
  Earth,
  FolderOpen,
  Gamepad2,
  Image,
  LockIcon,
  NotebookPen,
  PaintbrushIcon,
  Terminal,
  User2,
  Wallpaper,
} from "lucide-react";

const ICONS = [
  { id: "notes", label: "Notes", Icon: NotebookPen },
  { id: "paint", label: "Paint", Icon: PaintbrushIcon },
  { id: "saved_notes", label: "Saved Notes", Icon: FolderOpen },
  { id: "clock", label: "Clock", Icon: Clock },
  { id: "security", label: "Security", Icon: LockIcon },
  { id: "space_explorer_game", label: "Space Game", Icon: Gamepad2 },
  { id: "portfolio", label: "My Portfolio", Icon: User2 },
  { id: "react_code_editor", label: "Code Lab", Icon: Code2 },
  { id: "calculator", label: "Calculator", Icon: Calculator },
  { id: "chitramitra", label: "ChitraMitra - Social App", Icon: Image },
  { id: "solar_system", label: "Solar System", Icon: Earth },
  { id: "terminal", label: "Terminal", Icon: Terminal },
  { id: "wallpaper", label: "Wallpaper", Icon: Wallpaper },
];

function AppIcons() {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute top-4 left-4 z-10"
      style={{
        columnWidth: "60px",
        columnGap: "12px",
        maxHeight: "calc(100vh - 2rem)",
      }}
    >
      {ICONS.map((icon) => (
        <div key={icon.id} className="mb-4 break-inside-avoid">
          <button
            className="flex flex-col items-center space-y-1 hover:scale-105 transition"
            onClick={() => dispatch(openApp(icon.id))}
          >
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-sm">
              <icon.Icon className="w-7 h-7 cursor-pointer" />
            </div>
            <span className="text-xs text-center w-12">{icon.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppIcons;
