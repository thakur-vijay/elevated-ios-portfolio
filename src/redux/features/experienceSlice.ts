import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExperienceData } from "../../sanity/sanityService";
import { ExperienceResponse } from "../../models/experience.ts";

interface ExperienceState {
  experience: ExperienceResponse[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ExperienceState = {
  experience: null,
  status: "idle",
  error: null,
};

export const fetchExperienceResponse = createAsyncThunk<ExperienceResponse[] | null>(
  "experience/fetchExperience",
  async () => {
    return await fetchExperienceData();
  },
);

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperienceResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExperienceResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchExperienceResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default experienceSlice.reducer;
