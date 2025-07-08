import { LockKeyhole } from "lucide-react";
import { useSecurity } from "../../hooks/useSecurity";

function Security() {
  const {
    lockEnabled,
    handleEnableLock,
    handleDisableLock,
    password,
    handlePassword,
    handlePasswordSubmission,
    setLockEnabled,
  } = useSecurity();

  return (
    <div className="text-white p-6 w-full h-full">
      <h2 className="flex gap-2 text-xl font-semibold border-b border-white/10 pb-2">
        <LockKeyhole /> Security Settings
      </h2>

      {lockEnabled === null && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-300">
            Would you like to enable a password lock for added security?
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleEnableLock}
              className="px-4 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-sm text-sm transition"
            >
              Enable Lock
            </button>
            <button
              onClick={handleDisableLock}
              className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-sm text-sm transition"
            >
              Skip / Disable Lock
            </button>
          </div>
        </div>
      )}

      {lockEnabled === true && (
        <div className="space-y-3">
          <p className="text-sm text-zinc-300">
            Please set your password below. This will be required each time the
            system starts.
          </p>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-sm bg-zinc-800 text-sm border border-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Enter a secure password"
            value={password}
            onChange={handlePassword}
          />
          <button
            onClick={handlePasswordSubmission}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-sm hover:bg-blue-600 transition"
          >
            Save & Enable Lock
          </button>
        </div>
      )}

      {lockEnabled === false && (
        <div className="space-y-3">
          <p className="text-sm text-zinc-400 italic">
            🔓 Password lock has been disabled. Your system will not require
            authentication on boot.
          </p>
          <button
            onClick={() => setLockEnabled(null)}
            className="px-4 py-2 bg-zinc-700 text-white rounded-sm text-sm hover:bg-zinc-600 transition"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Security;
