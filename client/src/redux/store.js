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
import budgetReducer from "@/redux/slices/budget-slice.js";
import totalReducer from "@/redux/slices/total-slice.js";
import MinMaxReducer from "@/redux/slices/minmax-slice.js";
import transactionReducer from "@/redux/slices/transaction-slice.js";

export const rootReducer = combineReducers({
  user: authReducer,
  budget: budgetReducer,
  MM: MinMaxReducer,
  total: totalReducer,
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
