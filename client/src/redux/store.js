import { configureStore } from "@reduxjs/toolkit";
// defaults to localStorage
import { combineReducers } from "redux";

import budgetReducer from "@/redux/slices/budget-slice.js";
import totalReducer from "@/redux/slices/total-slice.js";
import MinMaxReducer from "@/redux/slices/minmax-slice.js";
import transactionReducer from "@/redux/slices/transaction-slice.js";
import tripReducer from "@/redux/slices/trip-slice.js";

export const rootReducer = combineReducers({
  budget: budgetReducer,
  MM: MinMaxReducer,
  total: totalReducer,
  transaction: transactionReducer,
  trip: tripReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
