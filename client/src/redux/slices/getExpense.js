import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: null,
  loading: false,
  error: false,
};
// Async thunk to fetch expense data
export const fetchAllData = createAsyncThunk(
  "expense/fetchAllData",
  async () => {
    const response = await axios.get("http://127.0.0.1:8080/expense/get-data");
    return response.data;
  },
);

const getExpense = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getExpense.reducer;
