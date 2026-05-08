import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectData } from "../../sanity/sanityService";
import { ProjectResponse } from "../../models/project.ts";

interface ProjectState {
  project: ProjectResponse[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  status: "idle",
  error: null,
};

export const fetchProjectResponse = createAsyncThunk<ProjectResponse[] | null>(
  "project/fetchProjects",
  async () => {
    return await fetchProjectData();
  },
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.project = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchProjectResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default projectSlice.reducer;
