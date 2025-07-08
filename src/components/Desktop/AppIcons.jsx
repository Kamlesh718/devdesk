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
  Settings,
  Terminal,
  User2,
  Wallpaper,
} from "lucide-react";
import { useSetting } from "../../context/useSettings";
import { iconMap } from "../../utils/iconsMaps";

function AppIcons() {
  const dispatch = useDispatch();
  const { theme } = useSetting();
  return (
    <div
      className="absolute top-4 left-4 z-10"
      style={{
        columnWidth: "60px",
        columnGap: "12px",
        maxHeight: "calc(100vh - 2rem)",
      }}
    >
      {iconMap.map((icon) => (
        <div key={icon.id} className="mb-4 break-inside-avoid">
          <button
            className="flex flex-col items-center space-y-1 hover:scale-105 transition"
            onClick={() => dispatch(openApp(icon.id))}
          >
            <div
              className={`w-12 h-12 ${
                !theme ? " bg-gray-200" : "bg-black/30"
              } rounded-lg flex items-center justify-center text-sm`}
            >
              <icon.Icon className="w-7 h-7 cursor-pointer" />
            </div>
            <span
              className={`text-xs text-center w-12 ${
                !theme ? "text-white" : "text-gray-300"
              } `}
            >
              {icon.label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppIcons;
