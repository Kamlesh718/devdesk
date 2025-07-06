import { format } from "date-fns";
import { useEffect, useState } from "react";

function ClockApp() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    });

    return () => clearTimeout(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h2 className="text-5xl font-mono">{format(time, "hh:mm:ss a")}</h2>
      <p className="text-sm mt-2 text-zinc-400">
        {format(time, "eeee, MMMM d, yyyy")}
      </p>
    </div>
  );
}

export default ClockApp;
