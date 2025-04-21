import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authUser.js";
import expenseReducer from '@/redux/slices/userExpenseData.js'

export const store = configureStore({
  reducer: {
    user: authReducer,
    expense : expenseReducer,
  },
});
