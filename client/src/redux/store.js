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
import getMaxExpenseReducer from "@/redux/slices/getMaxExpense.js";
import configMaxExpenseeReducer from "@/redux/slices/configMaxExpense.js";
import configExpenseReducer from "@/redux/slices/configExpense.js";
import initalMountReducer from "@/redux/slices/initalMount.js";

export const rootReducer = combineReducers({
  user: authReducer,
  expense: getExpenseReducer,
  maxExpense: getMaxExpenseReducer,
  configMaxExpense: configMaxExpenseeReducer,
  configExpense: configExpenseReducer,
  initalMount: initalMountReducer,
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
