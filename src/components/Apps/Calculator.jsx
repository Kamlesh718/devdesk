import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (val) => {
    setInput((prev) => prev + val);
  };

  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch {
      setResult("Error");
    }
  };

  const clear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="p-4 w-full h-full bg-zinc-900/60 rounded-lg text-white flex flex-col justify-between">
      <div className="mb-2">
        <div className="text-lg font-mono bg-zinc-800 p-2 rounded-md mb-1">
          {input || "0"}
        </div>
        <div className="text-right text-xl font-semibold text-green-400">
          {result}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
            className="bg-zinc-700 hover:bg-zinc-600 rounded-md py-2 text-lg font-semibold"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={clear}
          className="col-span-4 bg-red-500/80 hover:bg-red-500 text-white rounded-md py-2 mt-1"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
