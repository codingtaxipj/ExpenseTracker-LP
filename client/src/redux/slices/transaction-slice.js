import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchTotal } from "./total-slice";
import { fetchMM } from "./minmax-slice";
import { PaymentStatus } from "@/global/globalVariables";
import { apiCLient } from "@/api/apiClient";
import { ArrayCheck } from "@/components/utility";

const initialState = {
  // --- States for FETCHING data ---
  expenseData: null,
  expenseLoading: false,
  expenseError: null,

  recurringData: null,
  recurringLoading: false,
  recurringError: null,

  incomeData: null,
  incomeLoading: false,
  incomeError: null,

  // --- States for MUTATION (insert, delete, update) operations ---
  insertExpenseLoading: false,
  insertExpenseError: null,

  insertRecurringLoading: false,
  insertRecurringError: null,

  insertIncomeLoading: false,
  insertIncomeError: null,

  deleteExpenseLoading: false,
  deleteExpenseError: null,

  deleteIncomeLoading: false,
  deleteIncomeError: null,
};

const userID = 123456;

export const fetchExpense = createAsyncThunk(
  "transaction/fetchExpense",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/transaction/get-expense/${userID}`);
      return res.data;
    } catch (err) {
      // 'err.message' is now the clean string from our interceptor.
      return rejectWithValue(err.message);
    }
  },
);

export const insertExpense = createAsyncThunk(
  "transaction/insertExpense",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.post(`/transaction/add-expense`, data);
      dispatch(fetchTotal());
      dispatch(fetchMM());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchRecurringExpense = createAsyncThunk(
  "transaction/fetchRecurringExpense",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(
        `/transaction/get-recurring-expense/${userID}`,
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchIncome = createAsyncThunk(
  "transaction/fetchIncome",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/transaction/get-income/${userID}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const insertRecurringExpense = createAsyncThunk(
  "transaction/insertRecurringExpense",
  async ({ data }, { dispatch, rejectWithValue }) => {
    const { isRepeatStatus } = data;

    try {
      const res = await apiCLient.post(
        `/transaction/add-recurring-expense`,
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
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const insertIncome = createAsyncThunk(
  "transaction/insertIncome",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.post(`/transaction/add-income`, data);
      await fetchAllData(dispatch);
      return { success: true, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteExpense = createAsyncThunk(
  "transaction/deleteExpense",
  async ({ userID, expID }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.delete(
        `/transaction/delete-expense/${userID}/${expID}`,
      );
      await fetchAllData(dispatch);
      return { success: true, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteIncome = createAsyncThunk(
  "transaction/deleteIncome",
  async ({ userID, incID }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.delete(
        `/transaction/delete-income/${userID}/${incID}`,
      );
      await fetchAllData(dispatch);
      return { success: true, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const transaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // NOTE - Expense Fetch
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
        state.expenseError = action.payload;
      })
      // NOTE - Insert Expense
      .addCase(insertExpense.pending, (state) => {
        state.insertExpenseLoading = true;
        state.insertExpenseError = null;
      })
      .addCase(insertExpense.fulfilled, (state, action) => {
        state.insertExpenseLoading = false;
        // action.payload is the new expense object from the thunk
        // We add it to our existing array in the state.
        // Using unshift() adds it to the beginning of the list.
        if (state.expenseData) {
          state.expenseData.unshift(action.payload);
        } else {
          // If the list was empty before, create it
          state.expenseData = [action.payload];
        }
      })
      .addCase(insertExpense.rejected, (state, action) => {
        // If the API call fails, we do nothing to expenseData.
        // The user's list remains unchanged.
        state.insertExpenseLoading = false;
        state.insertExpenseError = action.payload;
      })

      // NOTE - Recurring Expense Fetch
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
        state.recurringError = action.payload; // Use payload from rejectWithValue
      })

      // NOTE - Income Fetch
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
        state.incomeError = action.payload; // Use payload from rejectWithValue
      })

      // NOTE - Insert Recurring Expense
      .addCase(insertRecurringExpense.pending, (state) => {
        state.insertRecurringLoading = true;
        state.insertRecurringError = null;
      })
      .addCase(insertRecurringExpense.fulfilled, (state) => {
        state.insertRecurringLoading = false;
      })
      .addCase(insertRecurringExpense.rejected, (state, action) => {
        state.insertRecurringLoading = false;
        state.insertRecurringError = action.payload;
      })

      // NOTE - Insert Income
      .addCase(insertIncome.pending, (state) => {
        state.insertIncomeLoading = true;
        state.insertIncomeError = null;
      })
      .addCase(insertIncome.fulfilled, (state) => {
        state.insertIncomeLoading = false;
      })
      .addCase(insertIncome.rejected, (state, action) => {
        state.insertIncomeLoading = false;
        state.insertIncomeError = action.payload;
      })

      // NOTE - Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.deleteExpenseLoading = true;
        state.deleteExpenseError = null;
      })
      .addCase(deleteExpense.fulfilled, (state) => {
        state.deleteExpenseLoading = false;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.deleteExpenseLoading = false;
        state.deleteExpenseError = action.payload;
      })

      // NOTE - Delete Income
      .addCase(deleteIncome.pending, (state) => {
        state.deleteIncomeLoading = true;
        state.deleteIncomeError = null;
      })
      .addCase(deleteIncome.fulfilled, (state) => {
        state.deleteIncomeLoading = false;
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.deleteIncomeLoading = false;
        state.deleteIncomeError = action.payload;
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
    dispatch(fetchExpense()),
  ]);
};

// ====================================================================
// ++ NEW SECTION: MEMOIZED SELECTORS for Transactions ++ ✅
// ====================================================================

const selectTransactionState = (state) => state.transaction;

const selectRawExpenseData = createSelector(
  [selectTransactionState],
  (transaction) => transaction.expenseData,
);

const selectRawIncomeData = createSelector(
  [selectTransactionState],
  (transaction) => transaction.incomeData,
);

// Memoized selectors that return the processed, ready-to-use lists
export const selectExpenseList = createSelector(
  [selectRawExpenseData],
  (expenseData) => ArrayCheck(expenseData) || [],
);

export const selectIncomeList = createSelector(
  [selectRawIncomeData],
  (incomeData) => ArrayCheck(incomeData) || [],
);
//NOTE: Use ArrayCheck and ensure it returns [] if null so that.... If expenseData is [] (an empty array), [].map() is perfectly safe. It just does nothing.
