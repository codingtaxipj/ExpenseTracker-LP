import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
export const filterTypes = {
  THIS_YEAR: "This Year",
  THIS_MONTH: "This Month",
  LAST_6_MONTHS: "Last 6 Months",
  LAST_3_MONTHS: "Last 3 Months",
  LAST_30_DAYS: "last 30 days",
  LAST_15_DAYS: "last 15 days",
  LAST_7_DAYS: "last 7 days",
  BY_YEAR: "By Year",
  BY_MONTH: "By Month",
  CUSTOM_DATES: "Custom Dates",
  ALL_TIME: "All Time",
};

const initialState = {
  type: filterTypes.THIS_YEAR,
  values: {
    year: moment().year(),
    month: moment().month(),
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGlobalFilter: (state, action) => {
      state.type = action.payload.type;
      state.values = action.payload.values;
    },
  },
});

export const { setGlobalFilter } = filterSlice.actions;
export default filterSlice.reducer;

// Selector to get the current filter
export const selectCurrentFilter = (state) => state.filter;
