import { createSelector } from "@reduxjs/toolkit";
import { filterTypes, selectCurrentFilter } from "../slices/filter-slice";
import {
  TotalOfDatesOfSelectedMonth,
  TotalOfLastSelectedDays,
  TotalOfLastSelectedMonths,
  TotalOfMonthOfSelectedYear,
} from "./total-selector";
import { getDate, getMonthName } from "@/utilities/calander-utility";

export const selectGraphData = createSelector(
  [
    selectCurrentFilter,
    TotalOfMonthOfSelectedYear,
    TotalOfDatesOfSelectedMonth,
    TotalOfLastSelectedMonths,
    TotalOfLastSelectedDays,
  ],
  (
    filter,
    TotalOfMonthOfSelectedYear,
    TotalOfDatesOfSelectedMonth,
    TotalOfLastSelectedMonths,
    TotalOfLastSelectedDays,
  ) => {
    let ExpenseGraphData = [];
    let IncomeGraphData = [];

    if (
      filter.type === filterTypes.BY_YEAR ||
      filter.type === filterTypes.THIS_YEAR
    ) {
      ExpenseGraphData = TotalOfMonthOfSelectedYear.ExpenseOfMonthOfYear.map(
        (e) => ({
          indicator: getMonthName(e.month), // e.g., "October"
          Amount: e.amount,
        }),
      );
      IncomeGraphData = TotalOfMonthOfSelectedYear.IncomeOfMonthOfYear.map(
        (e) => ({
          indicator: getMonthName(e.month),
          Amount: e.amount,
        }),
      );
    }
    if (
      filter.type === filterTypes.BY_MONTH ||
      filter.type === filterTypes.THIS_MONTH
    ) {
      ExpenseGraphData = TotalOfDatesOfSelectedMonth.ExpenseOfMonthDates.filter(
        (e) => e.amount >= 0,
      ).map((e) => ({
        indicator: getDate(e.date, "DD, MMM"),
        Amount: e.amount,
      }));
      IncomeGraphData = TotalOfDatesOfSelectedMonth.IncomeOfMonthDates.filter(
        (e) => e.amount >= 0,
      ).map((e) => ({
        indicator: getDate(e.date, "DD, MMM"),
        Amount: e.amount,
      }));
    }
    if (
      filter.type === filterTypes.LAST_9_MONTHS ||
      filter.type === filterTypes.LAST_6_MONTHS ||
      filter.type === filterTypes.LAST_3_MONTHS
    ) {
      ExpenseGraphData = TotalOfLastSelectedMonths.ExpenseOfLastMonths.map(
        (e) => ({
          indicator: getMonthName(e.month),
          Amount: e.amount,
        }),
      );
      IncomeGraphData = TotalOfLastSelectedMonths.IncomeOfLastMonths.map(
        (e) => ({
          indicator: getMonthName(e.month),
          Amount: e.amount,
        }),
      );
    }
    if (
      filter.type === filterTypes.LAST_15_DAYS ||
      filter.type === filterTypes.LAST_7_DAYS ||
      filter.type === filterTypes.LAST_30_DAYS
    ) {
      ExpenseGraphData = TotalOfLastSelectedDays.ExpenseOfLastDays.map((e) => ({
        indicator: getDate(e.day, "DD, MMM"),
        Amount: e.amount,
      }));
      IncomeGraphData = TotalOfLastSelectedDays.IncomeOfLastDays.map((e) => ({
        indicator: getDate(e.day, "DD, MMM"),
        Amount: e.amount,
      }));
    }
    return { ExpenseGraphData, IncomeGraphData };
  },
);
