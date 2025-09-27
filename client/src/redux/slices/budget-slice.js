import { apiCLient } from "@/api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  BudgetData: null,
  BudgetLoading: false,
  BudgetError: null,

  BudgetInsertLoading: false,
  BudgetInsertError: null,
};

const userID = 123456;

export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/budget/get-data/${userID}`);
      return res.data;
    } catch (err) {
      // 'err.message' is now the clean string from our interceptor.
      return rejectWithValue(err.message);
    }
  },
);

export const insertBudget = createAsyncThunk(
  "budget/insertBudget",
  async ({ mode, data }, { dispatch, rejectWithValue }) => {
    try {
      let res;
      if (mode === "new") {
        res = await apiCLient.post(`/budget/add-data`, data);
      } else if (mode === "update") {
        res = await apiCLient.patch(`/budget/update-budget`, data);
      }
      await dispatch(fetchBudget());
      return { success: true, message: res.data.message };
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
      .addCase(insertBudget.pending, (state) => {
        state.BudgetInsertLoading = true;
        state.BudgetInsertError = null;
      })
      .addCase(insertBudget.fulfilled, (state) => {
        state.BudgetInsertLoading = false;
      })
      .addCase(insertBudget.rejected, (state, action) => {
        state.BudgetInsertLoading = false;
        state.BudgetInsertError = action.payload;
      });
  },
});

export default budget.reducer;
