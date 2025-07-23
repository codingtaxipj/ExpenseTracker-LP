import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  incomeTotalData: null,
  expenseTotalData: null,
  loading: false,
  error: false,
};

const userID = 12345;

export const fetchTotal = createAsyncThunk("total/fetchTotal", async () => {
  const res = await axios.get(
    `http://127.0.0.1:8080/total/get-total/${userID}`,
  );
  return res.data;
});

const totalSlice = createSlice({
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
        const incomingData = action.payload;
        if (!Array.isArray(incomingData)) return;
        state.expenseTotalData =
          incomingData.find((i) => i.isTotalExpense === true) || null;
        state.incomeTotalData =
          incomingData.find((i) => i.isTotalExpense === false) || null;
      })
      .addCase(fetchTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default totalSlice.reducer;
