import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExperiencePageData } from "../../sanity/sanityService";
import { ExperiencePageResponse } from "../../models/experience.ts";

interface ExperiencePageState {
  experiencePage: ExperiencePageResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ExperiencePageState = {
  experiencePage: null,
  status: "idle",
  error: null,
};

export const fetchExperiencePageResponse = createAsyncThunk<ExperiencePageResponse | null>(
  "/experiencePage",
  async () => {
    return await fetchExperiencePageData();
  },
);

const experiencePageSlice = createSlice({
  name: "experiencePage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiencePageResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExperiencePageResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experiencePage = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchExperiencePageResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default experiencePageSlice.reducer;
