import { TerminalIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTerminal } from "../../hooks/useTerminal";

function Terminal() {
  const { commandInput, handleCommandInput, handleKeyDown, outputLines } =
    useTerminal();

  return (
    <>
      <div className="flex items-center bg-black text-green-500 font-mono px-4 py-2 rounded-md shadow-md w-full max-w-lg">
        <TerminalIcon className="text-green-500" />
        <span className="animate-pulse ml-2">_</span>
        <input
          type="text"
          className="bg-transparent outline-none border-none ml-2 flex-1 text-green-500 placeholder-green-500 caret-green-500"
          placeholder="Enter command..."
          value={commandInput}
          onChange={handleCommandInput}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="px-4 py-2 text-green-500 font-mono flex flex-col space-y-1">
        <AnimatePresence>
          {outputLines.map((line, index) => (
            <motion.div
              key={line + index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Terminal;
