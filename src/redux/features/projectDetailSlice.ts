import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectDetailData } from "../../sanity/sanityService";
import { ProjectResponse } from "../../models/project.ts";

interface ProjectDetailState {
  project: ProjectResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectDetailState = {
  project: null,
  status: "idle",
  error: null,
};

export const fetchProjectDetailResponse = createAsyncThunk<ProjectResponse | null, string>(
  "project/fetchProjectDetail",
  async (id: string) => {
    return await fetchProjectDetailData(id);
  },
);

const projectDetailSlice = createSlice({
  name: "projectDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetailResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectDetailResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.project = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchProjectDetailResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default projectDetailSlice.reducer;
