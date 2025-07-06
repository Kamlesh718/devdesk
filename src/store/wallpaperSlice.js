import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch wallpapers
export const fetchWallpapers = createAsyncThunk(
  "wallpaper/fetchWallpapers",
  async (_, { getState }) => {
    const { query, page } = getState().wallpaper;
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
    return data.photos;
  }
);

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState: {
    wallpapers: [],
    query: "space",
    page: 1,
    wallpaperUrl: "",
    status: "idle",
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page = Math.max(1, state.page - 1);
    },
    setWallpaperUrl: (state, action) => {
      state.wallpaperUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWallpapers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchWallpapers.fulfilled, (state, action) => {
      state.wallpapers = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(fetchWallpapers.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setQuery, nextPage, prevPage, setWallpaperUrl } =
  wallpaperSlice.actions;

export default wallpaperSlice.reducer;
