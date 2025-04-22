import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: null,
  loading: false,
  error: false,
};

// Async thunk to fetch max expense data
export const fetchMaxData = createAsyncThunk(
  "expense/fetchMaxData",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:8080/expense/get-max-data",
    );
    return response.data;
  },
);

const getMaxExpense = createSlice({
  name: "maxExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaxData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaxData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMaxData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getMaxExpense.reducer;
