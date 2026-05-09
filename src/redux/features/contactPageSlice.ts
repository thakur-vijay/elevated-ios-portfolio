import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContactPageData } from "../../sanity/sanityService";
import { ContactPageResponse } from "../../models/contactPage.ts";

interface ContactPageState {
  contactPage: ContactPageResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContactPageState = {
  contactPage: null,
  status: "idle",
  error: null,
};

export const fetchContactPageResponse = createAsyncThunk<ContactPageResponse | null>(
  "/contactPage",
  async () => {
    return await fetchContactPageData();
  },
);

const contactPageSlice = createSlice({
  name: "contactPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactPageResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactPageResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactPage = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchContactPageResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default contactPageSlice.reducer;
