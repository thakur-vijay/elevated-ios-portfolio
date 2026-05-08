import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../../sanity/sanityService";
import { UserResponse } from "../../models/user.ts";

interface UserState {
  user: UserResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUserResponse = createAsyncThunk<UserResponse | null>("/user", async () => {
  return await fetchUserData();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default userSlice.reducer;
