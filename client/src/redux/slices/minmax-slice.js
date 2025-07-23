import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  expenseMMData: null,
  incomeMMData: null,
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
        const incomingData = action.payload;
        if (!Array.isArray(incomingData)) return;
        state.expenseMMData =
          incomingData.find((i) => i.isMinMaxExpense === true) || null;
        state.incomeMMData =
          incomingData.find((i) => i.isMinMaxExpense === false) || null;
      })
      .addCase(fetchMM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default MinMax.reducer;
