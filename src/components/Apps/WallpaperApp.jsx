import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounced";
import { useWallpaper } from "../../hooks/useWallpaper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWallpapers,
  nextPage,
  prevPage,
  setQuery,
  setWallpaperUrl,
} from "../../store/wallpaperSlice";
import SkeletonNewsCard from "../SkeletonNewsCard";
import { Loader2 } from "lucide-react";

function WallpaperApp() {
  const dispatch = useDispatch();
  const { query, page, wallpapers, wallpaperUrl, status } = useSelector(
    (state) => state.wallpaper
  );
  const debouncedQuery = useDebounce(query, 400);

  console.log(status);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      dispatch(fetchWallpapers());
    }
  }, [debouncedQuery, page, dispatch]);

  useEffect(() => {
    const localWallpaper = localStorage.getItem("wallpaper");
    localStorage.setItem("wallpaper", wallpaperUrl || localWallpaper);
  }, [wallpaperUrl]);

  console.log(wallpapers);
  return (
    <div className="p-4 h-full y-scroll-container">
      <h1 className="text-xl font-semibold mb-4 text-white">
        🖼 {query} Wallpapers
      </h1>
      <div className="flex justify-between gap-2 m-2 items-center backdrop-blur-md p-2 rounded-md border border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              dispatch(setQuery(e.target.value));
            }}
            className="bg-transparent text-sm text-white placeholder:text-zinc-400 px-3 py-1 outline-none border border-white/10 rounded-md focus:ring-1 focus:ring-blue-500 w-60"
            placeholder="Search wallpapers..."
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => dispatch(prevPage())}
            disabled={page === 1}
            className="px-3 cursor-pointer mr-1 py-1 bg-zinc-700 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs text-zinc-300">Page {page}</span>
          <button
            onClick={() => dispatch(nextPage())}
            className="px-3 cursor-pointer py-1 ml-1 bg-zinc-700 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>

      {status === "loading" ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="rounded-lg overflow-hidden shadow-md border border-white/10 bg-white/5 hover:scale-105 transition cursor-pointer"
              onClick={() => dispatch(setWallpaperUrl(wallpaper.src.landscape))}
            >
              <img
                src={wallpaper.src.tiny}
                alt={wallpaper.alt}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WallpaperApp;
