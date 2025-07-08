import {
  BanIcon,
  ChromeIcon,
  FolderIcon,
  Grid2X2,
  LoaderCircle,
  MailOpen,
  NotebookPen,
  PaintbrushIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import TimeAndDate from "./TimeAndDate";
import Weather from "./Weather";
import NewsModal from "./NewsModal";
import { useTaskbar } from "../../hooks/useTaskbar";
import ActiveApps from "./ActiveApps";
import { useSetting } from "../../context/useSettings";

function Taskbar() {
  const {
    locationInput,
    setLocationInput,
    newsContainerRef,
    showNewsButtonRef,
  } = useTaskbar();

  const { theme } = useSetting();

  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: 0.5,
      }}
      className={`absolute bottom-0 left-0 w-full h-12 border-t-[1px] ${
        theme ? "bg-black/30 text-white" : "bg-white/70 text-gray-600"
      } backdrop-blur-sm border-t-gray-500 flex items-center justify-center text-sm z-20 px-2`}
    >
      <div className=" flex items-center justify-between w-full">
        <div>
          <Weather showNewsButtonRef={showNewsButtonRef} />
          <NewsModal
            newsContainerRef={newsContainerRef}
            setLocationInput={setLocationInput}
            locationInput={locationInput}
          />
        </div>
        <ul className="flex gap-3 items-center">
          {/* <li>
            <Grid2X2 className="w-7 h-7" />
          </li>
          <li>
            <ChromeIcon className="w-7 h-7" />
          </li>
          <li>
            <MailOpen className="w-7 h-7" />
          </li>
          <li>
            <FolderIcon className="w-7 h-7" />
          </li> */}
          <ActiveApps />
        </ul>
        <TimeAndDate />
      </div>
    </motion.section>
  );
}

export default Taskbar;
