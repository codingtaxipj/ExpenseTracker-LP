import { createSlice } from "@reduxjs/toolkit";
//import moment from "moment";

const initialState = {
  dataExpense: null,
  dataIncome: null,
};

/* const currMonth = moment().month();
const currYear = moment().year();
const currWeek = moment().week();
const getTotal = (total) => {
  total.reduce((sum, items) => sum + items.amount, 0);
  return total;
}; */

const configExpense = createSlice({
  name: "configExpense",
  initialState,
  reducers: {
    /* NOTE: get only Expense data entries */
    filterMyData: (state, action) => {
      const { data, filterValue } = action.payload;
      const sortedData = data.filter(
        (items) => items.isFormExpense === filterValue,
      );
      filterValue
        ? (state.dataExpense = sortedData)
        : (state.dataIncome = sortedData);
    },
  },
});

export const { configExpenseData, filterMyData } = configExpense.actions;

export default configExpense.reducer;
