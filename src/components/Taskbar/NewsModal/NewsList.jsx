import { motion } from "motion/react";

function NewsList({ news, itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="bg-zinc-800/80 p-3 rounded-lg hover:bg-zinc-700 transition flex gap-3"
    >
      {/* Thumbnail Image */}
      {news?.urlToImage && (
        <img
          src={news.urlToImage}
          alt={news.title}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
        />
      )}

      {/* Content */}
      <div className="flex flex-col">
        <h2 className="font-medium text-sm text-white line-clamp-3">
          {news?.title}
        </h2>
        <p className="text-xs text-zinc-300 mt-1 line-clamp-3">
          {news?.description}
        </p>
        <a
          href={news?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-600 mt-auto pt-2"
        >
          Read Full Article →
        </a>
      </div>
    </motion.div>
  );
}

export default NewsList;
