import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "./useDebounced";
import {
  fetchCurrentWeather,
  fetchSearchLocation,
} from "../store/weatherSlice";
import { fetchNews } from "../store/newsModalSlice";
import { useTaskbar } from "./useTaskbar";

export function useNewsModal() {
  const { locationInput, setLocationInput } = useTaskbar();
  const [showSearchedLocation, setShowSearchLocation] = useState(true);
  const [page, setPage] = useState(1);
  const weatherLocationDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const showNews = useSelector((state) => state.newsModal.showNews);
  const searchLocationData = useSelector(
    (state) => state.weather.searchResults
  );
  const newsData = useSelector((state) => state.newsModal.data);
  const newsFetchingStatus = useSelector((state) => state.newsModal.status);
  const latLon = JSON.parse(localStorage.getItem("weathercoords"));
  const debounceSeacrh = useDebounce(locationInput, 400);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  const handleLocationInput = (e) => {
    setLocationInput(e.target.value);
  };

  const handleSelectedLocation = (lat, lon) => {
    localStorage.setItem("weathercoords", JSON.stringify({ lat, lon }));
    setShowSearchLocation(false);
    setLocationInput("");
    dispatch(fetchCurrentWeather({ lat, lon }));
  };

  useEffect(() => {
    if (debounceSeacrh.trim().length < 2) return;
    setShowSearchLocation(true);
    dispatch(fetchSearchLocation(debounceSeacrh.trim()));
  }, [debounceSeacrh, dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentWeather(latLon));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        weatherLocationDropdownRef.current &&
        !weatherLocationDropdownRef.current.contains(e.target)
      ) {
        setShowSearchLocation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(fetchNews({ page }));
  }, [dispatch, page]);

  const handlePrev = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return {
    locationInput,
    showSearchedLocation,
    showNews,
    searchLocationData,
    newsData,
    newsFetchingStatus,
    containerVariants,
    itemVariants,
    handleLocationInput,
    handleSelectedLocation,
    handlePrev,
    handleNext,
    page,
    weatherLocationDropdownRef,
  };
}
