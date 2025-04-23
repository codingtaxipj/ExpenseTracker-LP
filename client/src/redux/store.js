import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authUser.js";
import getExpenseReducer from "@/redux/slices/getExpense.js";
import getMaxExpenseReducer from "@/redux/slices/getMaxExpense.js";
import filterMaxExpenseReducer from "@/redux/slices/filterMaxExpense.js";
import configExpenseReducer from "@/redux/slices/configExpense.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    expense: getExpenseReducer,
    maxExpense: getMaxExpenseReducer,
    filterMaxExpense: filterMaxExpenseReducer,
    configExpense: configExpenseReducer,
  },
});
