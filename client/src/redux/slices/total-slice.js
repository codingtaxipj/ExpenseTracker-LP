import { apiCLient } from "@/api/apiClient";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { ArrayCheck } from "@/components/utility";

const initialState = {
  TotalData: null,
  TotalLoading: false,
  TotalError: null,
};

const userID = "123456";

export const fetchTotal = createAsyncThunk(
  "total/fetchTotal",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/total/get-total/${userID}`);
      return res.data;
    } catch (err) {
      // 'err.message' is now the clean string from our interceptor.
      return rejectWithValue(err.message);
    }
  },
);

const total = createSlice({
  name: "total",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotal.pending, (state) => {
        state.TotalLoading = true;
        state.TotalError = null;
      })
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.TotalLoading = false;
        state.TotalData = action.payload;
      })
      .addCase(fetchTotal.rejected, (state, action) => {
        state.TotalLoading = false;
        state.TotalError = action.payload;
      });
  },
});

export default total.reducer;

// ====================================================================
// ? ++ NEW SECTION: MEMOIZED SELECTORS for Total ++ ✅
// ====================================================================

const selectTotalState = (state) => state.total;

export const selectRawTotalData = createSelector([selectTotalState], (total) =>
  ArrayCheck(total.TotalData),
);

// --- Data Sorting by Expense ---
export const selectExpenseTotal = createSelector(
  [selectRawTotalData],
  (data) => (!data ? [] : data.filter((d) => d.isTypeExpense === true)),
);

// --- Data Sorting by Income ---
export const selectIncomeTotal = createSelector([selectRawTotalData], (data) =>
  !data ? [] : data.filter((d) => d.isTypeExpense === false),
);

// --- Reusable Mapper Functions ---
const mapToYearlyData = (data) =>
  data.map((m) => ({
    year: m.year,
    total: m.total,
    isTypeExpense: m.isTypeExpense,
  }));

const mapToMonthlyData = (data) =>
  data.map((m) => ({
    year: m.year,
    monthList: m.monthList,
    isTypeExpense: m.isTypeExpense,
  }));

const mapToPrimeData = (data) =>
  data.map((m) => ({
    year: m.year,
    primeList: m.primeList,
    isTypeExpense: m.isTypeExpense,
  }));

const mapToSubData = (data) =>
  data.map((m) => ({
    year: m.year,
    subList: m.subList,
    isTypeExpense: m.isTypeExpense,
  }));

// Expense Selectors
export const selectExpenseTotal_ByYear = createSelector(
  [selectExpenseTotal],
  mapToYearlyData,
);
export const selectExpenseTotal_ByMonth = createSelector(
  [selectExpenseTotal],
  mapToMonthlyData,
);
export const selectExpenseTotal_ByPrime = createSelector(
  [selectExpenseTotal],
  mapToPrimeData,
);
export const selectExpenseTotal_BySub = createSelector(
  [selectExpenseTotal],
  mapToSubData,
);

// Income Selectors
export const selectIncomeTotal_ByYear = createSelector(
  [selectIncomeTotal],
  mapToYearlyData,
);
export const selectIncomeTotal_ByMonth = createSelector(
  [selectIncomeTotal],
  mapToMonthlyData,
);
export const selectIncomeTotal_ByPrime = createSelector(
  [selectIncomeTotal],
  mapToPrimeData,
);
export const selectIncomeTotal_BySub = createSelector(
  [selectIncomeTotal],
  mapToSubData,
);

// --- get list of years ---
export const selectYearsList = createSelector([selectRawTotalData], (data) =>
  !data ? [] : [...new Set(data.map((m) => m.year))],
);
