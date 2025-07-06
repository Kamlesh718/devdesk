import { NotebookPen, PaintbrushIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { restoreApp } from "../../store/windowsManagerSlice";
import { iconMap } from "../../utils/iconsMaps";

function ActiveApps() {
  const openApps = useSelector((state) => state.windowManager.openApps);
  const dispatch = useDispatch();

  return (
    <AnimatePresence initial={false}>
      {openApps.map((apps) => {
        const IconComponent = iconMap[apps.id] || <BanIcon />;
        return (
          <motion.li
            key={apps.id}
            initial={{ scale: 0.5, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <IconComponent
              className="w-7 h-7 cursor-pointer"
              onClick={() => dispatch(restoreApp(apps.id))}
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white shadow-md"></span>
          </motion.li>
        );
      })}
    </AnimatePresence>
  );
}

export default ActiveApps;
