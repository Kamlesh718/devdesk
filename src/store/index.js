import { configureStore } from "@reduxjs/toolkit";
import newsModalReducer from "./newsModalSlice";
import weatherReducer from "./weatherSlice";
import windowManagerReducer from "./windowsManagerSlice";
import notesReducer from "./notesSlice";
import wallpaperReducer from "./wallpaperSlice";
import securityReducer from "./securitySlice";

const store = configureStore({
  reducer: {
    newsModal: newsModalReducer,
    weather: weatherReducer,
    windowManager: windowManagerReducer,
    notes: notesReducer,
    wallpaper: wallpaperReducer,
    security: securityReducer,
  },
});

export default store;
