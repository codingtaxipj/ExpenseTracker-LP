import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const userID = "123456";

export const fetchTotal = createAsyncThunk("total/fetchTotal", async () => {
  const res = await axios.get(
    `http://127.0.0.1:8080/total/get-total/${userID}`,
  );

  return res.data;
});

const total = createSlice({
  name: "total",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default total.reducer;
