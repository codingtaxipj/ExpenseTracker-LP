import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchTotal } from "./total-slice";
import { fetchMM } from "./minmax-slice";
import { PaymentStatus } from "@/global/globalVariables";

const initialState = {
  expenseData: null,
  expenseLoading: false,
  expenseError: null,
  recurringData: null,
  recurringLoading: false,
  recurringError: null,
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

export const fetchRecurringExpense = createAsyncThunk(
  "transaction/fetchRecurringExpense",
  async () => {
    const res = await axios.get(
      `http://127.0.0.1:8080/transaction/get-recurring-expense/${userID}`,
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
      await fetchAllData(dispatch);
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

export const insertRecurringExpense = createAsyncThunk(
  "transaction/insertRecurringExpense",
  async ({ data }, { dispatch }) => {
    const { isRepeatStatus } = data;

    try {
      const res = await axios.post(
        `http://127.0.0.1:8080/transaction/add-recurring-expense`,
        data,
      );

      if (isRepeatStatus === PaymentStatus.PAID) {
        const expenseData = removeKeys(data, [
          "isRepeatBy",
          "isRepeatStatus",
          "lastPaymentDate",
        ]);
        await dispatch(insertExpense({ data: expenseData }));
        await fetchAllData(dispatch);
      } else {
        await dispatch(fetchRecurringExpense());
      }
      return { success: true, message: res.data.message };
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        "Add Recurring Expense action failed.";
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
      await fetchAllData(dispatch);
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

      // NOTE - expense Fetch
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

      // NOTE - recurring expense Fetch
      .addCase(fetchRecurringExpense.pending, (state) => {
        state.recurringLoading = true;
        state.recurringError = null;
      })
      .addCase(fetchRecurringExpense.fulfilled, (state, action) => {
        state.recurringLoading = false;
        state.recurringData = action.payload;
      })
      .addCase(fetchRecurringExpense.rejected, (state, action) => {
        state.recurringLoading = false;
        state.recurringError = action.error.message;
      })

      // NOTE - income Fetch
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
      });
  },
});

export default transaction.reducer;

// NOTE - fun to remove given keys from obj
function removeKeys(obj, keysToRemove) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key)),
  );
}

//
/**
what promise do ??
Start all three fetches at the same time (parallel execution).
Wait until all of them are finished (resolved).
Only then move to the next line in your code.
=================================
async will fetch one by one , remove it to fetch parallely also remove the promise then
 */
export const fetchAllData = (dispatch) => {
  return Promise.all([
    dispatch(fetchIncome()),
    dispatch(fetchTotal()),
    dispatch(fetchMM()),
  ]);
};
