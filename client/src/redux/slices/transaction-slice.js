import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchTotal } from "./total-slice";
import { fetchMM } from "./minmax-slice";

const initialState = {
  expenseData: null,
  expenseLoading: false,
  expenseError: null,
  incomeData: null,
  incomeLoading: false,
  incomeError: null,
};

const userID = 123456;

export const fetchExpense = createAsyncThunk(
  "transaction/fetchExpense",
  async () => {
    const res = await axios.get(
      `http://127.0.0.1:8080/transaction/get-expense/${userID}`,
    );
    return res.data;
  },
);

export const fetchIncome = createAsyncThunk(
  "transaction/fetchIncome",
  async () => {
    const res = await axios.get(
      `http://127.0.0.1:8080/transaction/get-income/${userID}`,
    );
    return res.data;
  },
);

export const insertExpense = createAsyncThunk(
  "transaction/insertExpense",
  async ({ data }, { dispatch }) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8080/transaction/add-expense`,
        data,
      );
      await dispatch(fetchExpense());
      await dispatch(fetchTotal());
      await dispatch(fetchMM());
      return { success: true, message: res.data.message };
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        "Add Expense action failed.";
      return { success: false, message };
    }
  },
);

export const insertIncome = createAsyncThunk(
  "transaction/insertIncome",
  async ({ data }, { dispatch }) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8080/transaction/add-income`,
        data,
      );
      await dispatch(fetchIncome());
      await dispatch(fetchTotal());
      await dispatch(fetchMM());
      return { success: true, message: res.data.message };
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        "Add Income action failed.";
      return { success: false, message };
    }
  },
);

const transaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.pending, (state) => {
        state.expenseLoading = true;
        state.expenseError = null;
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.expenseLoading = false;
        state.expenseData = action.payload;
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        state.expenseLoading = false;
        state.expenseError = action.error.message;
      })
      .addCase(insertExpense.pending, (state) => {
        state.expenseLoading = true;
        state.expenseError = null;
      })
      .addCase(insertExpense.fulfilled, (state) => {
        state.expenseLoading = false;
      })
      .addCase(insertExpense.rejected, (state, action) => {
        state.expenseLoading = false;
        state.expenseError = action.error.message;
      })
      .addCase(fetchIncome.pending, (state) => {
        state.incomeLoading = true;
        state.incomeError = null;
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.incomeLoading = false;
        state.incomeData = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.incomeLoading = false;
        state.incomeError = action.error.message;
      })
      .addCase(insertIncome.pending, (state) => {
        state.incomeLoading = true;
        state.incomeError = null;
      })
      .addCase(insertIncome.fulfilled, (state) => {
        state.incomeLoading = false;
      })
      .addCase(insertIncome.rejected, (state, action) => {
        state.incomeLoading = false;
        state.incomeError = action.error.message;
      });
  },
});

export default transaction.reducer;
