import { createSlice } from "@reduxjs/toolkit";
//import moment from "moment";

const initialState = {
  dataExpense: null,
  dataIncome: null,
};

const configExpense = createSlice({
  name: "configExpense",
  initialState,
  reducers: {
    /* NOTE: get only Expense data entries */
    setDataExpense: (state, action) => {
      state.dataExpense = action.payload;
    },
    setDataIncome: (state, action) => {
      state.dataIncome = action.payload;
    },
  },
});

export const { setDataExpense, setDataIncome } = configExpense.actions;

export default configExpense.reducer;
