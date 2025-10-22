import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchTotal } from "./total-slice";
import { fetchMM } from "./minmax-slice";
import { apiCLient } from "@/api/apiClient";
import { ArrayCheck } from "@/components/utility";
import moment from "moment";
import { getMonthName } from "@/utilities/calander-utility";
import { filterTypes, selectCurrentFilter } from "./filter-slice";

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

  recentTransactions: null,
  recentTransactionsLoading: false,

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

/**
 ** ===================== important documentation =====================
 ** every insert and delete will call for below functions
 * @see fetchTotal - will fetch the Total DB
 * @see fetchMM - will fetch the Min Max DB
 */

const userID = 123456;

/**
 ** ===================== EXPENSE =====================
 * @see fetchExpense - fetch expense transactions
 * @see insertExpense - inserts expense transaction
 * @see deleteExpense - deletes expesne transaction
 *
 */

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

export const deleteExpense = createAsyncThunk(
  "transaction/deleteExpense",
  async ({ userID, expID }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.delete(
        `/transaction/delete-expense/${userID}/${expID}`,
      );

      dispatch(fetchTotal());
      dispatch(fetchMM());

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/**
 ** ===================== INCOME =====================
 * @see fetchIncome - fetch income transactions
 * @see insertIncome - inserts income transaction
 * @param {object} data - has the transaction data
 * @see deleteIncome - deletes income transaction
 *
 */

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

export const insertIncome = createAsyncThunk(
  "transaction/insertIncome",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.post(`/transaction/add-income`, data);

      dispatch(fetchTotal());
      dispatch(fetchMM());

      return res.data;
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

      dispatch(fetchTotal());
      dispatch(fetchMM());

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/**
 ** ===================== RECURRING EXPENSE =====================
 * @see fetchRecurringExpense - fetch recurring expense transactions
 * @see insertRecurringExpense - insert recurring expense transaction
 *
 */

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

export const insertRecurringExpense = createAsyncThunk(
  "transaction/insertRecurringExpense",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.post(
        `/transaction/add-recurring-expense`,
        data,
      );
      const { newExpense } = res.data;
      if (newExpense) {
        dispatch(fetchTotal());
        dispatch(fetchMM());
      }
      return res.data; // This will be { newRecurringExpense, newExpense }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Helper function to build the recent transactions list
const processRecentTransactions = (state) => {
  if (!state.expenseData || !state.incomeData) {
    return;
  }

  const latestExpenses = state.expenseData.slice(0, 10);
  const latestIncomes = state.incomeData.slice(0, 10);

  const combined = [...latestExpenses, ...latestIncomes];
  combined.sort((a, b) => new Date(b.onDate) - new Date(a.onDate));

  state.recentTransactions = combined.slice(0, 10);
  state.recentTransactionsLoading = false;
};

// --- HELPER FUNCTION to update the recent list on insert ---
const updateRecentTransactions = (state, newTransaction) => {
  if (!state.recentTransactions) {
    return;
  }

  if (state.recentTransactions.length >= 10) {
    const lastItem =
      state.recentTransactions[state.recentTransactions.length - 1];
    if (new Date(newTransaction.onDate) <= new Date(lastItem.onDate)) {
      return;
    }
  }

  const updatedList = [newTransaction, ...state.recentTransactions];
  updatedList.sort((a, b) => new Date(b.onDate) - new Date(a.onDate)); // Use .onDate here too
  state.recentTransactions = updatedList.slice(0, 10);
};

const transaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       ** =========================================
       ** Fetch Expense
       ** =========================================
       */
      .addCase(fetchExpense.pending, (state) => {
        state.expenseLoading = true;
        state.expenseError = null;
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.expenseLoading = false;
        state.expenseData = action.payload;
        //----- building recent transaction list -----
        processRecentTransactions(state);
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        state.expenseLoading = false;
        state.expenseError = action.payload;
        state.recentTransactionsLoading = false;
      })
      /**
       ** =========================================
       ** Insert Expense
       ** =========================================
       */
      .addCase(insertExpense.pending, (state) => {
        state.insertExpenseLoading = true;
        state.insertExpenseError = null;
      })
      .addCase(insertExpense.fulfilled, (state, action) => {
        state.insertExpenseLoading = false;
        if (state.expenseData) {
          state.expenseData.unshift(action.payload);
        } else {
          state.expenseData = [action.payload];
        }
        //----- logic to get recent transaction -----
        updateRecentTransactions(state, action.payload);
      })
      .addCase(insertExpense.rejected, (state, action) => {
        state.insertExpenseLoading = false;
        state.insertExpenseError = action.payload;
      })
      /**
       ** =========================================
       ** Delete Expense
       ** =========================================
       */
      .addCase(deleteExpense.pending, (state) => {
        state.deleteExpenseLoading = true;
        state.deleteExpenseError = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.deleteExpenseLoading = false;
        const deletedExp = action.payload;

        // 1. See if the deleted item is in our recent list.
        const isRecent = state.recentTransactions?.find(
          (tx) => tx._id === deletedExp?._id,
        );

        if (state.expenseData && deletedExp?._id) {
          state.expenseData = state.expenseData.filter(
            (expense) => expense._id !== deletedExp._id,
          );
        }
        if (!isRecent) {
          return;
        }
        //----- building recent transaction list -----
        processRecentTransactions(state);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.deleteExpenseLoading = false;
        state.deleteExpenseError = action.payload;
      })

      /**
       ** =========================================
       ** Fetch Recurring Expense
       ** =========================================
       */
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
      /**
       ** =========================================
       ** Insert Recurring Expense
       ** =========================================
       */
      .addCase(insertRecurringExpense.pending, (state) => {
        state.insertRecurringLoading = true;
        state.insertRecurringError = null;
      })
      .addCase(insertRecurringExpense.fulfilled, (state, action) => {
        state.insertRecurringLoading = false;
        const { newRecurringExpense, newExpense } = action.payload;
        if (state.recurringData) {
          state.recurringData.unshift(newRecurringExpense);
        } else {
          state.recurringData = [newRecurringExpense];
        }
        if (newExpense) {
          if (state.expenseData) {
            state.expenseData.unshift(newExpense);
          } else {
            state.expenseData = [newExpense];
          }
          //----- logic to get recent transaction -----
          updateRecentTransactions(state, newExpense);
        }
      })
      .addCase(insertRecurringExpense.rejected, (state, action) => {
        state.insertRecurringLoading = false;
        state.insertRecurringError = action.payload;
      })

      /**
       ** =========================================
       ** Fetch Income
       ** =========================================
       */
      .addCase(fetchIncome.pending, (state) => {
        state.incomeLoading = true;
        state.incomeError = null;
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.incomeLoading = false;
        state.incomeData = action.payload;
        //----- building recent transaction list -----
        processRecentTransactions(state);
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.incomeLoading = false;
        state.incomeError = action.payload; // Use payload from rejectWithValue
        state.recentTransactionsLoading = false;
      })
      /**
       ** =========================================
       ** Insert Income
       ** =========================================
       */
      .addCase(insertIncome.pending, (state) => {
        state.insertIncomeLoading = true;
        state.insertIncomeError = null;
      })
      .addCase(insertIncome.fulfilled, (state, action) => {
        state.insertIncomeLoading = false;
        if (state.incomeData) {
          state.incomeData.unshift(action.payload);
        } else {
          state.incomeData = [action.payload];
        }
        //----- logic to get recent transaction -----
        updateRecentTransactions(state, action.payload);
      })
      .addCase(insertIncome.rejected, (state, action) => {
        state.insertIncomeLoading = false;
        state.insertIncomeError = action.payload;
      })
      /**
       ** =========================================
       ** Delete Income
       ** =========================================
       */
      .addCase(deleteIncome.pending, (state) => {
        state.deleteIncomeLoading = true;
        state.deleteIncomeError = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.deleteIncomeLoading = false;
        const deletedInc = action.payload;

        // 1. See if the deleted item is in our recent list.
        const isRecent = state.recentTransactions?.find(
          (tx) => tx._id === deletedInc?._id,
        );

        if (state.incomeData && deletedInc?._id) {
          state.incomeData = state.incomeData.filter(
            (income) => income._id !== deletedInc._id,
          );
        }
        if (!isRecent) {
          return;
        }
        //----- building recent transaction list -----
        processRecentTransactions(state);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.deleteIncomeLoading = false;
        state.deleteIncomeError = action.payload;
      });
  },
});

export default transaction.reducer;

// ====================================================================
// ? ++ NEW SECTION: MEMOIZED SELECTORS for Transactions ++ ✅
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

const selectRawRecurringExpenseData = createSelector(
  [selectTransactionState],
  (transaction) => transaction.recurringData,
);

const selectRawRecentTransactions = createSelector(
  [selectTransactionState],
  (transaction) => transaction.recentTransactions,
);

/**
 ** Memoized selectors that return the processed, ready-to-use lists
 * =====================================================================
 * @see ArrayCheck - ensure it returns [] if null
 ** so that.... If state variable is [] (an empty array), [].map() is perfectly safe to run without giving error.
 */

export const selectExpenseList = createSelector(
  [selectRawExpenseData],
  (expenseData) => ArrayCheck(expenseData) || [],
);

export const selectIncomeList = createSelector(
  [selectRawIncomeData],
  (incomeData) => ArrayCheck(incomeData) || [],
);

export const selectRecurringExpenseList = createSelector(
  [selectRawRecurringExpenseData],
  (recurringData) => ArrayCheck(recurringData) || [],
);

export const selectRecentTransactionsList = createSelector(
  [selectRawRecentTransactions],
  (recentData) => ArrayCheck(recentData) || [],
);

export const selectRecurringTotals = createSelector(
  [selectRecurringExpenseList, selectCurrentFilter],
  (recurringList, currentFilter) => {
    if (!recurringList) return { monthly: 0, yearly: 0, total: 0 };
    const { type, values } = currentFilter;
    let filterEndDate;
    let filterYear = Number(values.year);
    let filterMonth = Number(values.month);

    console.log("Y", filterYear, "-M", filterMonth);

    // Determine the end date of our filter
    if (type === filterTypes.BY_MONTH) {
      filterEndDate = moment()
        .year(filterYear)
        .month(filterMonth)
        .endOf("month");
    } else {
      filterEndDate = moment().year(filterYear).endOf("year");
    }

    // 2. Filter for monthly expenses
    const byMonth =
      recurringList
        .filter(
          (m) =>
            m.isReccuringBy === 1 &&
            // --- THIS IS THE FIX ---
            // The start date must be ON OR BEFORE the filter's end date
            moment(m.onDate).isSameOrBefore(filterEndDate, "day"),
        )
        .reduce((total, item) => total + item.ofAmount, 0) || 0;

    // 3. Filter for yearly expenses
    const byYear =
      recurringList
        .filter(
          (m) =>
            m.isReccuringBy === 2 && moment(m.onDate).year() === filterYear,
        )
        .reduce((total, item) => total + item.ofAmount, 0) || 0;

    return { monthly: byMonth, yearly: byYear, total: byMonth + byYear };
  },
);

export const selectRecurringChartData = createSelector(
  [selectRecurringExpenseList, selectRecurringTotals],
  (recurringList, rcTotal) => {
    if (!recurringList || !rcTotal) return [];

    // Start with a 12-month array where each month has the base 'byMonth' total
    let monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      expense: rcTotal.byMonth,
    }));

    // Get the specific 'byYear' expenses
    const yearlyExpenses = recurringList
      .filter((r) => r.isReccuringBy === 2)
      .map((r) => ({
        month: moment(r.onDate).month(),
        total: r.ofAmount,
      }));

    // Add the yearly totals to their corresponding months
    monthlyTotals = monthlyTotals.map((item) => {
      const totalForMonth = yearlyExpenses
        .filter((entry) => entry.month === item.month)
        .reduce((sum, entry) => sum + entry.total, 0);
      return { ...item, expense: item.expense + totalForMonth };
    });

    // Format for the chart
    return monthlyTotals.map((a) => ({
      amount: a.expense,
      month: getMonthName(a.month, "MMMM"),
    }));
  },
);
