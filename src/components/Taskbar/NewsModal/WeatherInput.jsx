import { AnimatePresence, motion } from "motion/react";
import { useNewsModal } from "../../../hooks/useNewsModal";

function WeatherInput() {
  const {
    locationInput,
    handleLocationInput,
    showSearchedLocation,
    containerVariants,
    weatherLocationDropdownRef,
    searchLocationData,
    itemVariants,
    handleSelectedLocation,
  } = useNewsModal();
  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Enter your location for weather info"
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={locationInput}
        onChange={handleLocationInput}
        name="locationsearch"
      />

      {/* Dropdown results */}
      {searchLocationData.length > 0 &&
        (!showSearchedLocation ? null : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="absolute bottom-14 w-full max-h-[40vh] mt-1 backdrop-blur-md bg-black/10 border border-white/20 rounded-md shadow-lg y-scroll-container"
            ref={weatherLocationDropdownRef}
          >
            <AnimatePresence>
              {searchLocationData.map((sl) => (
                <motion.div
                  key={sl.id || `${sl.name}-${sl.region}`}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="p-3 border-b border-white/10 last:border-b-0 cursor-pointer hover:bg-white/10 transition"
                  onClick={() => handleSelectedLocation(sl.lat, sl.lon)}
                >
                  <p className="font-medium text-gray-200">
                    {sl.name}, {sl.region}
                  </p>
                  <p className="text-sm text-gray-400">{sl.country}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ))}
    </div>
  );
}

export default WeatherInput;
