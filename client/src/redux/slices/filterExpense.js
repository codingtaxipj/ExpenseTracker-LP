import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  expenseData: null,
  incomeData: null,
};

const filterExpense = createSlice({
  name: "filterExpense",
  initialState,
  reducers: {
    setExpenseData(state, action) {
      state.data = action.payload;
    },
    filterExpenseData(state) {
      state.expenseData = state.data.filter(
        (items) => items.isFormExpense === true,
      );
    },
    filterIncomeData(state) {
      state.incomeData = state.data.filter(
        (items) => items.isFormExpense === false,
      );
    },
  },
});

export const { setExpenseData, filterExpenseData, filterIncomeData } =
  filterExpense.actions;

export default filterExpense.reducer;
