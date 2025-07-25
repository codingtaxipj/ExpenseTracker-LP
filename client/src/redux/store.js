import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

import authReducer from "../redux/slices/authUser.js";
import getExpenseReducer from "@/redux/slices/getExpense.js";
import budgetReducer from "@/redux/slices/budget-slice.js";
import totalSliceReducer from "@/redux/slices/fetch-total.js";
import MinMaxReducer from "@/redux/slices/minmax-slice.js";
import transactionReducer from "@/redux/slices/transaction-slice.js";

import configExpenseReducer from "@/redux/slices/configExpense.js";
import initalMountReducer from "@/redux/slices/initalMount.js";
import configTotalReducer from "@/redux/slices/configTotal.js";

export const rootReducer = combineReducers({
  user: authReducer,
  expense: getExpenseReducer,
  configExpense: configExpenseReducer,
  configTotal: configTotalReducer,
  initalMount: initalMountReducer,
  budget: budgetReducer,
  MM: MinMaxReducer,
  total: totalSliceReducer,
  transaction: transactionReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["initalMount"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
