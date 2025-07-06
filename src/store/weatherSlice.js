import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearchLocation = createAsyncThunk(
  "weather/fetchSearchLocation",
  async (query) => {
    const APIKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const res = await fetch(`
        http://api.weatherapi.com/v1/search.json?key=${APIKey}&q=${query}
      `);
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async ({ lat, lon }, { signal }) => {
    const APIKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const res = await fetch(`
        http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${lat},${lon}&aqi=yes
      `);
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    searchResults: [],
    status: "idle",
    searchStatus: "idle",
    error: null,
    searchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For fetchCurrentWeather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      // For fetchSearchLocation
      .addCase(fetchSearchLocation.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(fetchSearchLocation.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchLocation.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.searchError = action.error;
      });
  },
});

export default weatherSlice.reducer;
