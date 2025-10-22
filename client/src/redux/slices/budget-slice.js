import { apiCLient } from "@/api/apiClient";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { ArrayCheck } from "@/components/utility";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";

const initialState = {
  BudgetData: null,
  BudgetLoading: false,
  BudgetError: null,

  BudgetInsertLoading: false,
  BudgetInsertError: null,
};

// The NEW thunk for creating/updating a budget
export const setBudget = createAsyncThunk(
  "budget/setBudget",
  async ({ data }, { rejectWithValue }) => {
    try {
      // It makes one simple API call to your new smart endpoint.
      const res = await apiCLient.post(`/budget/set-budget`, data);

      // It returns the full, updated budget data from the server.
      // NO need to dispatch fetchBudget().
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const userID = 123456;
// The CORRECTED thunk for fetching
export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/budget/get-data/${userID}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const budget = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Budget Fetch
      .addCase(fetchBudget.pending, (state) => {
        state.BudgetLoading = true;
        state.BudgetError = null;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.BudgetLoading = false;
        state.BudgetData = action.payload;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.BudgetLoading = false;
        state.BudgetError = action.payload;
      })

      // Budget Insert
      .addCase(setBudget.pending, (state) => {
        state.BudgetInsertLoading = true;
      })
      .addCase(setBudget.fulfilled, (state, action) => {
        state.BudgetInsertLoading = false;
        // action.payload is the full, updated budget data.
        // Simply replace the old state with the new state from the server.
        state.BudgetData = action.payload;
      })
      .addCase(setBudget.rejected, (state, action) => {
        state.BudgetInsertLoading = false;
        state.BudgetInsertError = action.payload;
      });
  },
});

export default budget.reducer;

// ====================================================================
// ? ++ NEW SECTION: MEMOIZED SELECTORS for Budget ++ ✅
// ====================================================================

const selectBudgetState = (state) => state.budget;

export const selectBudgetData = createSelector([selectBudgetState], (budget) =>
  ArrayCheck(budget.BudgetData),
);

export const SelectActiveBudget = createSelector(
  [selectBudgetData],
  (budget) => {
    if (!budget) return [];
    const currentYear = budget.find((b) => b.year === CurrentYear());

    if (!currentYear) return [];
    const bList = ArrayCheck(currentYear.budgetList);
    if (!bList) return [];
    bList.sort((a, b) => a.month - b.month);
    if (bList.length === 0) return [];
    const latest = bList[bList.length - 1];

    return {
      userID: currentYear.userID,
      year: currentYear.year,
      month: latest.month,
      amount: latest.budget,
    };
  },
);

export const selectBudgetList = createSelector([selectBudgetData], (budget) => {
  if (!budget) return [];
  const flatList = budget.flatMap(({ year, budgetList }) =>
    (budgetList ?? []).map((bd) => ({
      year,
      month: bd.month,
      budget: bd.budget,
    })),
  );
  return flatList.reverse();
});

export const selectBudgetByMonth = createSelector(
  [selectBudgetData],
  (budget) => {
    if (!budget) return [];
    return budget.map((data) => {
      const { year, budgetList } = data;
      const list = createBudgetArray(budgetList);
      const totalBudget = list.reduce((sum, b) => sum + b.budget, 0);
      return { year, list, totalBudget };
    });
  },
);

export const createBudgetArray = (list = []) => {
  const arr = [];
  let bud = null;
  for (let i = 0; i < 12; i++) {
    const match = list.find((b) => b.month === i);
    if (match) {
      bud = match.budget;
      arr.push({ month: i, budget: bud });
    } else if (bud !== null) {
      arr.push({ month: i, budget: bud });
    } else {
      arr.push({ month: i, budget: 0 });
    }
  }
  return arr;
};
