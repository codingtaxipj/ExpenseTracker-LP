import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const userID = 123456;

export const fetchMM = createAsyncThunk("budget/fetchMM", async () => {
  const res = await axios.get(
    `http://127.0.0.1:8080/minmax/get-data/${userID}`,
  );
  return res.data;
});

const MinMax = createSlice({
  name: "MM",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMM.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default MinMax.reducer;
