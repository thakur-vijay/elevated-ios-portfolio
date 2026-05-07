import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFooterData } from "../../sanity/sanityService";
import { FooterResponse } from "@/models/footer.ts";

interface FooterState {
  footer: FooterResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FooterState = {
  footer: null,
  status: "idle",
  error: null,
};

export const fetchFooterResponse = createAsyncThunk<FooterResponse | null>(
  "home/fetchFooter",
  async () => {
    return await fetchFooterData();
  },
);

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFooterResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.footer = action.payload;
      })
      .addCase(fetchFooterResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default footerSlice.reducer;
