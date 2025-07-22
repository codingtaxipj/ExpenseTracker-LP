import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const userID = 12345;

export const fetchBudget = createAsyncThunk("budget/fetchBudget", async () => {
  const res = await axios.get(
    `http://127.0.0.1:8080/budget/get-data/${userID}`,
  );
  return res.data;
});

export const insertBudget = createAsyncThunk(
  "budget/insertBudget",
  async ({ mode, data }, { dispatch }) => {
    try {
      let res;
      if (mode === "new") {
        res = await axios.post(`http://127.0.0.1:8080/budget/add-data`, data);
      } else if (mode === "update") {
        res = await axios.patch(
          `http://127.0.0.1:8080/budget/update-budget`,
          data,
        );
      }

      await dispatch(fetchBudget());
      return { success: true, message: res.data.message };
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        "Budget action failed.";

      return { success: false, message };
    }
  },
);

const budget = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(insertBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertBudget.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(insertBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default budget.reducer;
