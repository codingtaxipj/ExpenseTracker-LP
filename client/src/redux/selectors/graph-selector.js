import { createSelector } from "@reduxjs/toolkit";
import { filterTypes, selectCurrentFilter } from "../slices/filter-slice";
import {
  TotalOfDatesOfSelectedMonth,
  TotalOfMonthOfSelectedYear,
} from "./total-selector";
import { getMonthName } from "@/utilities/calander-utility";

export const selectGraphData = createSelector(
  [
    selectCurrentFilter,
    TotalOfMonthOfSelectedYear,
    TotalOfDatesOfSelectedMonth,
  ],
  (filter, TotalOfMonthOfSelectedYear, TotalOfDatesOfSelectedMonth) => {
    let ExpenseGraphData = [];
    let IncomeGraphData = [];

    if (
      filter.type === filterTypes.BY_YEAR ||
      filter.type === filterTypes.THIS_YEAR
    ) {
      ExpenseGraphData = TotalOfMonthOfSelectedYear.ExpenseOfMonthOfYear.map(
        (e) => ({
          indicator: getMonthName(e.month), // e.g., "October"
          amount: e.amount,
        }),
      );
      IncomeGraphData = TotalOfMonthOfSelectedYear.IncomeOfMonthOfYear.map(
        (e) => ({
          indicator: getMonthName(e.month),
          amount: e.amount,
        }),
      );
    }
    if (
      filter.type === filterTypes.BY_MONTH ||
      filter.type === filterTypes.THIS_MONTH
    ) {
      ExpenseGraphData = TotalOfDatesOfSelectedMonth.ExpenseOfMonthDates.filter(
        (e) => e.amount > 0,
      ).map((e) => ({
        indicator: e.date, // e.g., 23
        amount: e.amount,
      }));
      IncomeGraphData = TotalOfDatesOfSelectedMonth.IncomeOfMonthDates.filter(
        (e) => e.amount > 0,
      ).map((e) => ({
        indicator: e.date,
        amount: e.amount,
      }));
    }

    return { ExpenseGraphData, IncomeGraphData };
  },
);
