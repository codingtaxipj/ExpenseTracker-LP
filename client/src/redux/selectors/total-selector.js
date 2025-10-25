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
    date: targetDate.date(i + 1).format(),
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

  console.log("dailyarr", targetDate.date(5));

  return dailyArr;
};

//NOTE - total of last 9/6/3 - months of current year

export const TotalOfLastSelectedMonths = createSelector(
  [selectCurrentFilter, selectExpenseList, selectIncomeList],
  (filter, expense, income) => {
    let ofMonths;

    if (filter.type === filterTypes.LAST_9_MONTHS) ofMonths = 9;
    else if (filter.type === filterTypes.LAST_6_MONTHS) ofMonths = 6;
    else if (filter.type === filterTypes.LAST_3_MONTHS) ofMonths = 3;
    else return { ExpenseOfLastMonths: [], IncomeOfLastMonths: [] };

    // set start and end dates of months
    const startDate = moment()
      .subtract(ofMonths - 1, "months")
      .startOf("month");
    const endDate = moment().endOf("month");

    // transaction list of data in btwn dates
    const ExpenseList = expense.filter((e) =>
      moment(e.onDate).isBetween(startDate, endDate, "day", []),
    );
    const IncomeList = income.filter((e) =>
      moment(e.onDate).isBetween(startDate, endDate, "day", []),
    );

    // empty array of objs of each month
    const ExpenseOfLastMonths = Array.from({ length: ofMonths }, (_, i) => {
      const monthDate = moment().subtract(ofMonths - 1 - i, "months");
      return {
        month: monthDate.month(),
        amount: 0,
        year: monthDate.year(),
        label: monthDate.format("MMM"),
      };
    });
    // Create a DEEP COPY for income structure only
    const IncomeOfLastMonths = JSON.parse(JSON.stringify(ExpenseOfLastMonths));

    // caculating the total of dates matching month
    ExpenseList.forEach((tx) => {
      const txMonth = moment(tx.onDate).month();
      const targetMonth = ExpenseOfLastMonths.find((i) => i.month === txMonth);
      if (targetMonth) {
        targetMonth.amount += tx.ofAmount;
      }
    });
    IncomeList.forEach((tx) => {
      const txMonth = moment(tx.onDate).month();
      const targetMonth = IncomeOfLastMonths.find((i) => i.month === txMonth);
      if (targetMonth) {
        targetMonth.amount += tx.ofAmount;
      }
    });

    return { ExpenseOfLastMonths, IncomeOfLastMonths };
  },
);

//NOTE - total of last 30/15/7 days of current year

export const TotalOfLastSelectedDays = createSelector(
  [selectCurrentFilter, selectExpenseList, selectIncomeList],
  (filter, expense, income) => {
    let ofDates;

    if (filter.type === filterTypes.LAST_30_DAYS) ofDates = 30;
    else if (filter.type === filterTypes.LAST_15_DAYS) ofDates = 15;
    else if (filter.type === filterTypes.LAST_7_DAYS) ofDates = 7;
    else return { ExpenseOfLastDays: [], IncomeOfLastDays: [] };

    // set start and end dates
    const startDate = moment().subtract(ofDates, "days");
    const endDate = moment();

    // transaction list of data in btwn dates
    const ExpenseList = expense.filter((e) =>
      moment(e.onDate).isBetween(startDate, endDate, "day", []),
    );
    const IncomeList = income.filter((e) =>
      moment(e.onDate).isBetween(startDate, endDate, "day", []),
    );

    // empty array of objs of each month
    const ExpenseOfLastDays = Array.from({ length: ofDates }, (_, i) => {
      const date = moment().subtract(ofDates - i, "days");
      return {
        date: date.format("DD-MM-YYYY"),
        day: date,
        amount: 0,
      };
    });
    // Create a DEEP COPY for income structure only
    const IncomeOfLastDays = JSON.parse(JSON.stringify(ExpenseOfLastDays));

    // caculating the total of dates matching dates
    ExpenseList.forEach((tx) => {
      const txday = moment(tx.onDate);
      const targetDay = ExpenseOfLastDays.find((i) =>
        txday.isSame(i.day, "day"),
      );
      if (targetDay) {
        targetDay.amount += tx.ofAmount;
      }
    });
    IncomeList.forEach((tx) => {
      const txday = moment(tx.onDate);
      const targetDay = IncomeOfLastDays.find((i) =>
        txday.isSame(i.day, "day"),
      );
      if (targetDay) {
        targetDay.amount += tx.ofAmount;
      }
    });

    return { ExpenseOfLastDays, IncomeOfLastDays };
  },
);
