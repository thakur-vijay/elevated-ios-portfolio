import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSkillsData } from "../../sanity/sanityService";
import { SkillResponse } from "../../models/skill.ts";

interface SkillState {
  skill: SkillResponse[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SkillState = {
  skill: null,
  status: "idle",
  error: null,
};

export const fetchSkillResponse = createAsyncThunk<SkillResponse[] | null>(
  "skill/fetchSkills",
  async () => {
    return await fetchSkillsData();
  },
);

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkillResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skill = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchSkillResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default skillSlice.reducer;
