import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maxExpenseData: null,
  maxIncomeData: null,
};

const configMaxExpense = createSlice({
  name: "configMaxExpense",
  initialState,
  reducers: {
    filterMaxData(state, action) {
      const { data, filterByValue, filterByCategory } = action.payload;
      const maxData = data.filter(
        (items) =>
          items.isExpenseCategory === filterByValue &&
          items.isPrimeCategory === filterByCategory,
      );
      const sortedData = maxData.sort(
        (a, b) => b.categoryTotal - a.categoryTotal,
      );
      filterByValue
        ? (state.maxExpenseData = sortedData)
        : (state.maxIncomeData = sortedData);
    },
  },
});

export const { filterMaxData } = configMaxExpense.actions;

export default configMaxExpense.reducer;
