import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

import authReducer from "../redux/slices/authUser.js";
import getExpenseReducer from "@/redux/slices/getExpense.js";
import getMaxExpenseReducer from "@/redux/slices/getMaxExpense.js";
import filterMaxExpenseReducer from "@/redux/slices/filterMaxExpense.js";
import configExpenseReducer from "@/redux/slices/configExpense.js";

export const rootReducer = combineReducers({
  user: authReducer,
  expense: getExpenseReducer,
  maxExpense: getMaxExpenseReducer,
  filterMaxExpense: filterMaxExpenseReducer,
  configExpense: configExpenseReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["usconfigExpenseReducerer"], // 👈 specify which slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor
export const persistor = persistStore(store);
