import { useEffect, useState } from "react";
import Window from "./components/Window";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import bgImage2 from "./assets/TWD.png";
import SecurityOverlay from "./components/SecurityOverlay";
import { useSelector } from "react-redux";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState("");
  const [isSecurityEnable, setIsSecurityEnable] = useState(null);
  const success = useSelector((state) => state.security.success);

  useEffect(() => {
    const wallpaper = localStorage.getItem("wallpaper");
    const lock = JSON.parse(localStorage.getItem("lock"));
    setIsSecurityEnable(lock);
    setCurrentWallpaper(wallpaper);
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-cover overflow-hidden bg-black"
      style={{ backgroundImage: `url(${currentWallpaper})` }}
    >
      {
        !booted ? (
          <BootScreen onFinish={() => setBooted(true)} />
        ) : !isSecurityEnable || success ? (
          <Desktop />
        ) : (
          <SecurityOverlay />
        )
        // <Desktop />
      }
    </div>
  );
}
