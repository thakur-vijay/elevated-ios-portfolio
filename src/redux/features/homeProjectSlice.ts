import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHomeProjectData } from "../../sanity/sanityService";
import { ProjectResponse } from "../../models/project.ts";

interface HomeProjectState {
  homeProject: ProjectResponse[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HomeProjectState = {
  homeProject: null,
  status: "idle",
  error: null,
};

export const fetchHomeProjectResponse = createAsyncThunk<ProjectResponse[] | null>(
  "homeProject/fetchProjects",
  async () => {
    return await fetchHomeProjectData();
  },
);

const homeProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeProjectResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeProjectResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeProject = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchHomeProjectResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default homeProjectSlice.reducer;
