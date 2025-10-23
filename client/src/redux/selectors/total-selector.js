// ====================================================================
// ? ++ NEW SECTION: MEMOIZED SELECTORS for Total ++ ✅
// ====================================================================

import { ArrayCheck } from "@/components/utility";
import { createSelector } from "@reduxjs/toolkit";
import { selectExpenseList, selectIncomeList } from "./transaction-selector";
import { filterTypes, selectCurrentFilter } from "../slices/filter-slice";
import moment from "moment";

//NOTE - calling total redux state
const selectTotalState = (state) => state.total;

//NOTE - checking if state change
export const selectRawTotalData = createSelector([selectTotalState], (total) =>
  ArrayCheck(total.TotalData),
);

//? --- Data Sorting by Expense ---
export const selectExpenseTotal = createSelector(
  [selectRawTotalData],
  (data) => (!data ? [] : data.filter((d) => d.isTypeExpense === true)),
);

//? --- Data Sorting by Income ---
export const selectIncomeTotal = createSelector([selectRawTotalData], (data) =>
  !data ? [] : data.filter((d) => d.isTypeExpense === false),
);

/** ============================================================ */

//? --- Reusable Mapper Functions ---
const mapToYearlyData = (data) =>
  data.map((m) => ({
    year: m.year,
    total: m.total,
    isTypeExpense: m.isTypeExpense,
  }));

const mapToMonthlyData = (data) =>
  data.map((m) => ({
    year: m.year,
    monthList: m.monthList,
    isTypeExpense: m.isTypeExpense,
  }));

const mapToPrimeData = (data) =>
  data.map((m) => ({
    year: m.year,
    primeList: m.primeList,
    isTypeExpense: m.isTypeExpense,
  }));

const mapToSubData = (data) =>
  data.map((m) => ({
    year: m.year,
    subList: m.subList,
    isTypeExpense: m.isTypeExpense,
  }));

/** ============================================================ */

//NOTE - Expense Total by Category

//? ----- Year -----
export const selectExpenseTotal_ByYear = createSelector(
  [selectExpenseTotal],
  mapToYearlyData,
);
//? ----- Month -----
export const selectExpenseTotal_ByMonth = createSelector(
  [selectExpenseTotal],
  mapToMonthlyData,
);
//? ----- Prime Category (year & monthlist) -----
export const selectExpenseTotal_ByPrime = createSelector(
  [selectExpenseTotal],
  mapToPrimeData,
);
//? ----- Sub Category (year & monthlist) -----
export const selectExpenseTotal_BySub = createSelector(
  [selectExpenseTotal],
  mapToSubData,
);

//NOTE - Income Total by Category

//? ----- Year -----
export const selectIncomeTotal_ByYear = createSelector(
  [selectIncomeTotal],
  mapToYearlyData,
);
//? ----- Month -----
export const selectIncomeTotal_ByMonth = createSelector(
  [selectIncomeTotal],
  mapToMonthlyData,
);
//? ----- Prime Category (year & monthlist) -----
export const selectIncomeTotal_ByPrime = createSelector(
  [selectIncomeTotal],
  mapToPrimeData,
);
//? ----- Sub Category (year & monthlist) -----
export const selectIncomeTotal_BySub = createSelector(
  [selectIncomeTotal],
  mapToSubData,
);

/** ============================================================ */

//NOTE - array of years
export const selectYearsList = createSelector([selectRawTotalData], (data) =>
  !data ? [] : [...new Set(data.map((m) => m.year))],
);

/** ============================================================== */
//?  +++++ calculation process based on given filter type +++++
/** ============================================================== */

//NOTE - total of selected year filter

export const TotalOfSelectedYear = createSelector(
  [selectCurrentFilter, selectExpenseTotal_ByYear, selectIncomeTotal_ByYear],
  (filter, expense, income) => {
    const year = Number(filter.values.year);

    const ExpenseOfYear = expense?.find((e) => e.year === year)?.total ?? 0;
    const IncomeOfYear = income?.find((e) => e.year === year)?.total ?? 0;

    return { ExpenseOfYear, IncomeOfYear };
  },
);

//NOTE - total of selected year filter

export const TotalOfSelectedMonth = createSelector(
  [selectCurrentFilter, selectExpenseTotal_ByMonth, selectIncomeTotal_ByMonth],
  (filter, expense, income) => {
    const year = Number(filter.values.year);
    const month = Number(filter.values.month);

    const ExpenseOfMonth =
      expense
        ?.find((e) => e.year === year)
        ?.monthList?.find((e) => e.month === month)?.total ?? 0;
    const IncomeOfMonth =
      income
        ?.find((e) => e.year === year)
        ?.monthList?.find((e) => e.month === month)?.total ?? 0;
    console.log("Exp-month", ExpenseOfMonth, "MM-", month);
    return { ExpenseOfMonth, IncomeOfMonth };
  },
);

//NOTE - total of each months of selected year filter

export const TotalOfMonthOfSelectedYear = createSelector(
  [selectCurrentFilter, selectExpenseTotal_ByMonth, selectIncomeTotal_ByMonth],
  (filter, expense, income) => {
    const year = Number(filter.values.year);
    if (
      filter.type === filterTypes.THIS_YEAR ||
      filter.type === filterTypes.BY_YEAR
    ) {
      const ExpenseOfMonthOfYear = createEachMonthArray(expense, year);
      const IncomeOfMonthOfYear = createEachMonthArray(income, year);
      return { ExpenseOfMonthOfYear, IncomeOfMonthOfYear };
    } else return { ExpenseOfMonthOfYear: [], IncomeOfMonthOfYear: [] };
  },
);
//? ----- creates total of each month of selected year -----
const createEachMonthArray = (list, year) => {
  const data = list?.find((l) => l.year === year)?.monthList ?? [];
  const arr = [];
  for (let j = 0; j < 12; j++) {
    let e = data?.find((m) => m.month === j)?.total ?? 0;
    arr.push({
      year: year,
      month: j,
      amount: e,
    });
  }

  return arr;
};

//NOTE - total of each dates of selected month filter

export const TotalOfDatesOfSelectedMonth = createSelector(
  [selectCurrentFilter, selectExpenseList, selectIncomeList],
  (filter, expense, income) => {
    const year = Number(filter.values.year);
    const month = Number(filter.values.month);
    if (
      filter.type === filterTypes.BY_MONTH ||
      filter.type === filterTypes.THIS_MONTH
    ) {
      const ExpenseOfMonthDates = getDailyTotalsOfMonth(expense, year, month);
      const IncomeOfMonthDates = getDailyTotalsOfMonth(income, year, month);

      return { ExpenseOfMonthDates, IncomeOfMonthDates };
    } else return { ExpenseOfMonthDates: [], IncomeOfMonthDates: [] };
  },
);

//? ---- Generate array of transaction of dates by month selected -----
const getDailyTotalsOfMonth = (list, year, month) => {
  // Get the number of days in the selected month
  const targetDate = moment().year(year).month(month);
  const daysInMonth = targetDate.daysInMonth();

  const dailyArr = Array.from({ length: daysInMonth }, (_, i) => ({
    year: year,
    month: month,
    date: i + 1,
    amount: 0,
  }));

  const monthList = list.filter((l) =>
    moment(l.onDate).isSame(targetDate, "month"),
  );

  for (const tx of monthList) {
    const day = moment(tx.onDate).date(); // e.g., 15
    const index = day - 1; // 0-indexed for our array
    // Add the transaction's amount to the correct day's total
    if (index >= 0 && index < daysInMonth) {
      dailyArr[index].amount += tx.ofAmount;
    }
  }

  return dailyArr;
};
