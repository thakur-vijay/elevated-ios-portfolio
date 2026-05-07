import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHomeData } from "../../sanity/sanityService";
import { HomeResponse } from "@/models/home.ts";

interface HomeState {
  home: HomeResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HomeState = {
  home: null,
  status: "idle",
  error: null,
};

export const fetchHomeResponse = createAsyncThunk<HomeResponse | null>(
  "home/fetchHome",
  async () => {
    return await fetchHomeData();
  },
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.home = action.payload;
      })
      .addCase(fetchHomeResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default homeSlice.reducer;
