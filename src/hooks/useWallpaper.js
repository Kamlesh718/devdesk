import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounced";

export function useWallpaper() {
  const [wallpapers, setWallpapers] = useState([]);
  const [query, setQuery] = useState("space");
  const [page, setPage] = useState(1);
  const debounceSearch = useDebounce(query, 400);
  const [wallpaperUrl, setWallpaperUrl] = useState("");

  const handlePrev = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleQuery = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleWallpaper = async () => {
    const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=15`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setWallpapers(data.photos);
  };

  const handleSetWallpaperUrl = (url) => {
    if (url) {
      setWallpaperUrl(url);
    }
  };

  console.log(wallpaperUrl);

  useEffect(() => {
    if (debounceSearch.trim().length < 2) return;
    handleWallpaper();
  }, [debounceSearch, page]);

  return {
    wallpapers,
    query,
    page,
    debounceSearch,
    wallpaperUrl,
    handlePrev,
    handleNext,
    handleQuery,
    handleWallpaper,
    handleSetWallpaperUrl,
  };
}
