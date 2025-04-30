import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  data: null,
  dataExpense: null,
  dataIncome: null,
};

const currMonth = moment().month();
const currYear = moment().year();
const currWeek = moment().week();
const getTotal = (total) => {
  total.reduce((sum, items) => sum + items.amount, 0);
  return total;
};

const configExpense = createSlice({
  name: "configExpense",
  initialState,
  reducers: {
    /* NOTE: get all Expense data entries */
    configExpenseData: (state, action) => {
      state.data = action.payload;
    },

    /* NOTE: get only Income data entries */
    filterExpenseData: (state) => {
      state.dataExpense = state.data.filter(
        (items) => items.isFormExpense === true,
      );
    },
    /* NOTE: get only Expense data entries */
    filterIncomeData: (state) => {
      state.dataIncome = state.data.filter(
        (items) => items.isFormExpense === false,
      );
    },

    /* NOTE: get only current week Expense data entries */
    fetchCurrentWeekExpense: () => {
      const weekData = filterExpenseData().filter(
        (items) => moment(items.entryDate).month() === currWeek,
      );
      return weekData;
    },
    /* NOTE: get current week Total Expenses */
    fetchTotalExpenseCurrentWeek: () => {
      return getTotal(fetchCurrentWeekExpense());
    },
    /* NOTE: get only current month Expense data entries */
    fetchCurrentMonthExpense: () => {
      const data = filterExpenseData();
      console.log(data);

      /* const monthData = data.filter(
        (items) => moment(items.entryDate).month() === currMonth,
      );
      return monthData; */
    },
    /* NOTE: get current Month Total Expenses */
    fetchTotalExpenseCurrentMonth: () => {
      return getTotal(fetchCurrentMonthExpense());
    },
    /* NOTE: get only current year Expense data entries */
    fetchCurrentYearExpense: () => {
      const yearData = filterExpenseData().filter(
        (items) => moment(items.entryDate).year() === currYear,
      );
      return yearData;
    },
    /* NOTE: get current week Year Expenses */
    fetchTotalExpenseCurrentYear: () => {
      return getTotal(fetchCurrentYearExpense());
    },
  },
});

export const {
  configExpenseData,
  filterExpenseData,
  filterIncomeData,
  fetchCurrentWeekExpense,
  fetchCurrentMonthExpense,
  fetchCurrentYearExpense,
  fetchTotalExpenseCurrentWeek,
  fetchTotalExpenseCurrentMonth,
  fetchTotalExpenseCurrentYear,
} = configExpense.actions;

export default configExpense.reducer;
