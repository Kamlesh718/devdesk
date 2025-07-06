import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeNewsModal } from "../store/newsModalSlice";

export function useTaskbar() {
  const dispatch = useDispatch();
  const newsContainerRef = useRef(null);
  const showNewsButtonRef = useRef(null);
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        newsContainerRef.current &&
        !newsContainerRef.current.contains(e.target) &&
        showNewsButtonRef.current &&
        !showNewsButtonRef.current.contains(e.target)
      ) {
        dispatch(closeNewsModal());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return {
    locationInput,
    setLocationInput,
    newsContainerRef,
    showNewsButtonRef,
  };
}
