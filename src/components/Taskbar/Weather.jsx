import { useDispatch, useSelector } from "react-redux";
import { toggleNewsModal } from "../../store/newsModalSlice";
import { LoaderCircle } from "lucide-react";

function Weather({ showNewsButtonRef }) {
  const weatherData = useSelector((state) => state.weather.data);
  const weatherFetchingStatus = useSelector((state) => state.weather.status);
  const dispatch = useDispatch();

  const handleShowNews = () => {
    dispatch(toggleNewsModal());
  };

  return (
    <div
      role="button"
      className="cursor-pointer w-50 flex items-center justify-start gap-2 text-xs"
      onClick={handleShowNews}
      ref={showNewsButtonRef}
    >
      {weatherFetchingStatus === "loading" ? (
        <LoaderCircle className="animate-spin" />
      ) : weatherFetchingStatus === "failed" || weatherData?.error ? (
        <span className="cursor-pointer text-red-400 text-xs">
          ❌ Failed to fetch weather
        </span>
      ) : Object.keys(weatherData).length === 0 ? (
        <span className="cursor-pointer text-red-400 text-xs">
          ❌ No weather data available. Please search a location.
        </span>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <img
              src={weatherData?.current?.condition?.icon}
              alt="Weather"
              className="w-6 h-6"
            />
          </div>
          <span>{weatherData?.current?.condition?.text}</span>
          <div className="flex flex-col">
            <span>{Math.round(weatherData?.current?.temp_c)}°C</span>
            <span>{weatherData?.location?.name}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
