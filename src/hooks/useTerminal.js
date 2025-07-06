import { useState } from "react";

export function useTerminal() {
  const [commandInput, setCommandInput] = useState("");
  const [outputLines, setOutputLines] = useState([]);

  const handleCommandInput = (e) => {
    setCommandInput(e.target.value);
  };

  const handleRandomJoke = async () => {
    const res = await fetch(
      `https://official-joke-api.appspot.com/random_joke`
    );
    const { setup, punchline } = await res.json();
    return [`😂 ${setup}`, punchline];
  };

  const commandList = [
    {
      command: "help",
      output: [
        "🧠 Available Commands:",
        "• help",
        "• clear",
        "• whoami",
        "• ping",
        "• joke",
        "• say Hello!",
        "• status",
        "• open portal",
        "• exit",
      ],
    },
    {
      command: "clear",
      output: [],
    },
    {
      command: "whoami",
      output: ["👤 You are: admin (Level 99)"],
    },
    {
      command: "ping",
      output: ["📡 Pong! Latency: 42ms"],
    },
    {
      command: "joke",
      callAPI: handleRandomJoke,
    },
    {
      command: "say Hello!",
      output: ["🗣️ Terminal says: Hello!"],
    },
    {
      command: "status",
      output: [
        "📊 All systems nominal.",
        "💤 Chill mode: ON",
        "🧘 CPU temperature: Zen",
      ],
    },
    {
      command: "open portal",
      output: [
        "🔍 Scanning rift frequency...",
        "🌀 Stabilizing quantum tunnel...",
        "✨ Locking coordinates: [Dim-7/Zone-42]",
        "💫 Portal to Dimension 7 is now OPEN!",
      ],
    },
    {
      command: "exit",
      output: ["👋 Goodbye. See you in the mainframe."],
    },
  ];

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const input = commandInput.trim();
      const inputLower = input.toLowerCase();

      if (inputLower === "clear") {
        setOutputLines([]);
      } else {
        const foundCommand = commandList.find(
          (cmd) => inputLower === cmd.command.toLowerCase()
        );

        if (foundCommand) {
          if (foundCommand.callAPI) {
            const response = await foundCommand.callAPI();
            setOutputLines(response);
          } else {
            setOutputLines(foundCommand.output || []);
          }
        } else {
          setOutputLines([
            `❓ Command not recognized: "${input}" type help for commands`,
          ]);
        }
      }

      setCommandInput("");
    }
  };

  return { commandInput, handleCommandInput, handleKeyDown, outputLines };
}
