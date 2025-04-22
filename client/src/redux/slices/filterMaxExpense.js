import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  maxExpensePrime: null,
  maxIncomePrime: null,
};

const filterMaxExpense = createSlice({
  name: "filterMaxExpense",
  initialState,
  reducers: {
    setMaxExpenseData(state, action) {
      state.data = action.payload;
    },
    filterMaxExpensePrime(state) {
      state.maxExpensePrime = state.data.filter(
        (items) =>
          items.isExpenseCategory === true && items.isPrimeCategory === true,
      );
    },
    filterMaxIncomePrime(state) {
      state.maxIncomePrime = state.data.filter(
        (items) =>
          items.isExpenseCategory === false && items.isPrimeCategory === true,
      );
    },
  },
});

export const {
  setMaxExpenseData,
  filterMaxExpensePrime,
  filterMaxIncomePrime,
} = filterMaxExpense.actions;

export default filterMaxExpense.reducer;
