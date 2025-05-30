import { createSlice } from "@reduxjs/toolkit";
//import moment from "moment";

const initialState = {
  byYear: 0,
  byMonth: 0,
  byWeek: 0,
};

const configTotal = createSlice({
  name: "configTotal",
  initialState,
  reducers: {
    setYearsTotal: (state, action) => {
      state.byYear = action.payload;
    },
    setMonthsTotal: (state, action) => {
      state.byMonth = action.payload;
    },
    setWeeksTotal: (state, action) => {
      state.byWeek = action.payload;
    },
  },
});

export const { setYearsTotal, setMonthsTotal, setWeeksTotal } =
  configTotal.actions;

export default configTotal.reducer;
