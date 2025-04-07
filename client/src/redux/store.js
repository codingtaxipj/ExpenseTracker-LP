import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authUser.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});
