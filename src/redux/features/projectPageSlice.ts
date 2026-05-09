import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectPageData } from "../../sanity/sanityService";
import { ProjectPageResponse } from "../../models/projectPage.ts";

interface ProjectPageState {
  projectPage: ProjectPageResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectPageState = {
  projectPage: null,
  status: "idle",
  error: null,
};

export const fetchProjectPageResponse = createAsyncThunk<ProjectPageResponse | null>(
  "/projectPage",
  async () => {
    return await fetchProjectPageData();
  },
);

const projectPageSlice = createSlice({
  name: "projectPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectPageResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectPageResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectPage = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchProjectPageResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default projectPageSlice.reducer;
