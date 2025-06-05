import { createSlice } from "@reduxjs/toolkit";
//import moment from "moment";

const initialState = {
  expense: {
    byYear: {},
    byMonth: {},
    byPrime: {},
    bySub: {},
  },
  income: {
    byYear: {},
    byMonth: {},
    byPrime: {},
    bySub: {},
  },
};

const configTotal = createSlice({
  name: "configTotal",
  initialState,
  reducers: {
    //NOTE: Set Expense Total
    setExpenseYearsTotal: (state, action) => {
      state.expense.byYear = action.payload;
    },
    setExpenseMonthsTotal: (state, action) => {
      state.expense.byMonth = action.payload;
    },
    setExpensePrimeTotal: (state, action) => {
      state.expense.byPrime = action.payload;
    },
    setExpenseSubTotal: (state, action) => {
      state.expense.bySub = action.payload;
    },

    //NOTE: Set Income Total
    setIncomeYearsTotal: (state, action) => {
      state.income.byYear = action.payload;
    },
    setIncomeMonthsTotal: (state, action) => {
      state.income.byMonth = action.payload;
    },
    setIncomePrimeTotal: (state, action) => {
      state.income.byPrime = action.payload;
    },
    setIncomeSubTotal: (state, action) => {
      state.income.bySub = action.payload;
    },
  },
});

export const {
  setExpenseYearsTotal,
  setExpenseMonthsTotal,
  setExpensePrimeTotal,
  setExpenseSubTotal,
  setIncomeYearsTotal,
  setIncomeMonthsTotal,
  setIncomePrimeTotal,
  setIncomeSubTotal,
} = configTotal.actions;

export default configTotal.reducer;
