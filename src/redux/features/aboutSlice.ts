import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAboutData } from "../../sanity/sanityService";
import { AboutResponse } from "@/models/about.ts";

interface AboutState {
  about: AboutResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AboutState = {
  about: null,
  status: "idle",
  error: null,
};

export const fetchAboutResponse = createAsyncThunk<AboutResponse | null>("/about", async () => {
  return await fetchAboutData();
});

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.about = action.payload;
      })
      .addCase(fetchAboutResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default aboutSlice.reducer;
