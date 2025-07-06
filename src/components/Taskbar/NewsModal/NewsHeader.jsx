import { Newspaper } from "lucide-react";
import { motion } from "motion/react";

function NewsHeader() {
  return (
    <h1 className="text-2xl font-semibold flex flex-col items-center justify-center gap-2 mb-3">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          delay: 0.3,
        }}
        className="flex items-center gap-2"
      >
        <Newspaper className="w-6 h-6 text-white" />
        News
      </motion.span>
    </h1>
  );
}

export default NewsHeader;
