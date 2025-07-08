import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  password: "1234",
  success: false,
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    checkPassword(state, action) {
      if (action.payload === state.password) state.success = true;
    },
    isAuthenticated(state, action) {
      if (action.payload === true) state.success = true;
    },
  },
});

export const { checkPassword, isAuthenticated } = securitySlice.actions;

export default securitySlice.reducer;
