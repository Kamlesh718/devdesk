import { AlertTriangle, LoaderCircle, Newspaper } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import SkeletonNewsCard from "../SkeletonNewsCard";
import { useNewsModal } from "../../hooks/useNewsModal";
import WeatherInput from "./NewsModal/WeatherInput";
import NewsHeader from "./NewsModal/NewsHeader";
import NewsList from "./NewsModal/NewsList";

function NewsModal({ newsContainerRef }) {
  const {
    showNews,
    newsData,
    newsFetchingStatus,
    containerVariants,
    itemVariants,
    handlePrev,
    handleNext,
    page,
  } = useNewsModal();

  return (
    <AnimatePresence>
      {showNews && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.1,
          }}
          className="absolute bottom-14 left-4 w-[500px] h-[90dvh] p-4 flex flex-col bg-gradient-to-br from-[#1c1c1c]/80 to-[#2c2c2c]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-30 overflow-hidden justify-between"
          ref={newsContainerRef}
        >
          {newsFetchingStatus === "loading" ? (
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1">
              {[...Array(8)].map((_, i) => (
                <SkeletonNewsCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="grid grid-cols-2 gap-3 y-scroll-container "
            >
              <NewsHeader />
              {/* News Item */}
              {newsData?.error ? (
                <div className="col-span-2 flex items-start gap-3 p-4 bg-red-500/10 border border-red-400 text-red-200 rounded-md shadow">
                  <AlertTriangle className="w-5 h-5 text-red-300 mt-0.5" />
                  <span className="text-sm font-medium">{newsData.error}</span>
                </div>
              ) : (
                newsData.articles.map((news) => (
                  <NewsList
                    key={news?.url}
                    news={news}
                    itemVariants={itemVariants}
                  />
                ))
              )}

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="px-3 py-1 bg-zinc-700 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-xs text-zinc-300">Page {page}</span>
                <button
                  onClick={handleNext}
                  className="px-3 py-1 bg-zinc-700 text-white rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          <WeatherInput />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewsModal;
