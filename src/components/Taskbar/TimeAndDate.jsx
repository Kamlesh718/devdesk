import { format } from "date-fns";
import { useEffect, useState } from "react";

function TimeAndDate() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    });

    return () => clearTimeout(interval);
  }, []);
  return (
    <div className="flex flex-col items-end text-xs">
      <span>{format(time, "hh:mm:ss a ")}</span>
      <span>{format(time, "MMM d, yyyy")}</span>
    </div>
  );
}

export default TimeAndDate;
