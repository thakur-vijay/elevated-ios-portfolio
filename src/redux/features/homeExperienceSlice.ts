import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHomeExperienceData } from "../../sanity/sanityService";
import { ExperienceResponse } from "../../models/experience.ts";

interface HomeExperienceState {
  experience: ExperienceResponse[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HomeExperienceState = {
  experience: null,
  status: "idle",
  error: null,
};

export const fetchHomeExperienceResponse = createAsyncThunk<ExperienceResponse[] | null>(
  "experience/fetchHomeExperience",
  async () => {
    return await fetchHomeExperienceData();
  },
);

const homeExperienceSlice = createSlice({
  name: "homeExperience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeExperienceResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeExperienceResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchHomeExperienceResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default homeExperienceSlice.reducer;
