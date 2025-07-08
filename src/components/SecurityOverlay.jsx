import { useEffect, useState } from "react";
import { ArrowBigRight, UserCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../store/securitySlice";
import { useSetting } from "../context/useSettings";

function SecurityOverlay() {
  const [password, setPassword] = useState("");
  const [systemPass, setSystemPass] = useState("");
  const { username } = useSetting();

  const dispatch = useDispatch();

  const handleUnlock = () => {
    if (systemPass === password) dispatch(isAuthenticated(true));
    if (systemPass !== password) alert("Password is wrong");
  };

  useEffect(() => {
    const sysPass = localStorage.getItem("securitypassword");
    setSystemPass(sysPass);
  }, []);

  return (
    <div className="text-white bg-black/40 backdrop-blur-xl flex flex-col gap-12 items-center justify-center h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden relative z-50">
      <div className="flex gap-2 flex-col items-center">
        <UserCircle2 className="w-32 h-32 text-white" />
        <h2 className="text-2xl">{username}</h2>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent text-white placeholder:text-white/50 outline-none px-2 py-1 w-60 text-sm font-medium"
        />
        <button
          onClick={handleUnlock}
          className="p-2 rounded hover:bg-white/10 transition-colors"
        >
          <ArrowBigRight className="w-5 h-5 text-white/80" />
        </button>
      </div>

      <p className="text-sm text-white/50 tracking-wide font-light">
        🔒 DevDesk is locked. Please enter your password to continue.
      </p>
    </div>
  );
}

export default SecurityOverlay;
