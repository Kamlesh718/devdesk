import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk("news", async ({ page }) => {
  const newsAPIKey = import.meta.env.VITE_NEWS_API_KEY;
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=india&language=en&pageSize=8&page=${page}&apiKey=${newsAPIKey}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

const newsModalSlice = createSlice({
  name: "modal",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    showNews: false,
  },
  reducers: {
    toggleNewsModal: (state) => {
      state.showNews = !state.showNews;
    },
    closeNewsModal: (state) => {
      state.showNews = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { toggleNewsModal, closeNewsModal } = newsModalSlice.actions;
export default newsModalSlice.reducer;
