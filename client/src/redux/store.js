import { configureStore } from "@reduxjs/toolkit";
import sliceOneReducer from "./slices/sliceOne";

export const store = configureStore({
  reducer: {
    SOX: sliceOneReducer,
  },
});
