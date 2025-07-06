import bgImage2 from "../assets/TWD.png";
import Taskbar from "./Taskbar/Taskbar";
import Window from "./Window";
import { useEffect } from "react";
import { motion } from "motion/react";
import { appsConfig } from "./Apps/appConfig";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, minimizeApp } from "../store/windowsManagerSlice";
import { setSavedNote } from "../store/notesSlice";
import AppIcons from "./Desktop/AppIcons";

export default function Desktop() {
  const openApps = useSelector((state) => state.windowManager.openApps);
  const dispatch = useDispatch();
  const wallpaperUrl = useSelector((state) => state.wallpaper.wallpaperUrl);

  const locallySetWallpaper = localStorage.getItem("wallpaper");

  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden  text-white flex-col gap-4"
      style={{
        backgroundImage: `${
          wallpaperUrl || locallySetWallpaper
            ? `url(${wallpaperUrl || locallySetWallpaper})`
            : `url(${bgImage2})`
        }`,
        backgroundSize: "cover", // Maintain full coverage
        backgroundPosition: "center", // Keep centered
        backgroundRepeat: "no-repeat", // Prevent tiling
        backgroundAttachment: "fixed", // Optional: makes it behave like a wallpaper
      }}
    >
      {/* App Specific Windows */}
      {openApps.map((app) => {
        if (app.minimized) return null;
        const appConfig = appsConfig[app.id];
        if (!appConfig) return null;
        const AppComponent = appConfig.component;

        return (
          <Window
            key={app.id}
            title={appConfig.title}
            id={app.id}
            onClose={() => {
              dispatch(closeApp(app.id));
              // if (appConfig.onCloseExtra) appConfig.onCloseExtra(dispatch);
            }}
            onMinimize={() => dispatch(minimizeApp(app.id))}
          >
            <AppComponent />
          </Window>
        );
      })}

      {/* Desktop Icons */}
      <AppIcons />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
