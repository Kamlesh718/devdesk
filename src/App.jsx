import { useState } from "react";
import Window from "./components/Window";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import bgImage2 from "./assets/TWD.png";

export default function App() {
  const [booted, setBooted] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover overflow-hidden bg-black">
      {!booted ? <BootScreen onFinish={() => setBooted(true)} /> : <Desktop />}
    </div>
  );
}
