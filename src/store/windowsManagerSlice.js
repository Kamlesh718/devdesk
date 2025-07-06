import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openApps: [],
};
const windowManagerSlice = createSlice({
  name: "windowsManager",
  initialState,
  reducers: {
    openApp: (state, action) => {
      const appId = action.payload;
      const exists = state.openApps.find((app) => app.id === appId);
      if (!exists) {
        state.openApps.push({ id: appId, minimized: false, maximized: false });
      }
    },

    closeApp: (state, action) => {
      const appId = action.payload;
      state.openApps = state.openApps.filter((app) => app.id !== appId);
    },

    minimizeApp: (state, action) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) app.minimized = true;
    },
    restoreApp: (state, action) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) app.minimized = false;
    },
    bringToFront: (state, action) => {
      const index = state.openApps.findIndex(
        (app) => app.id === action.payload
      );
      if (index !== -1) {
        const app = state.openApps.splice(index, 1)[0];
        state.openApps.push(app); // Move to end = front
      }
    },
  },
});

export const { openApp, closeApp, minimizeApp, restoreApp, bringToFront } =
  windowManagerSlice.actions;

export default windowManagerSlice.reducer;
