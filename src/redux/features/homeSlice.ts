import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHomeData } from "../../sanity/sanityService";

interface HomeState {
  home: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HomeState = {
  home: null,
  status: "idle",
  error: null,
};

export const fetchHomeResponse = createAsyncThunk("home/fetchHome", async () => {
  const response = await fetchHomeData();
  console.log("response from homeSlice", response);
  return response ? response[0] : null;
});

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
