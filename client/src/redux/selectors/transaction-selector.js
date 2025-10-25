// ====================================================================
// ? ++ NEW SECTION: MEMOIZED SELECTORS for Transactions ++ ✅
// ====================================================================

import { ArrayCheck } from "@/components/utility";
import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";
import { filterTypes, selectCurrentFilter } from "../slices/filter-slice";
import { getMonthName } from "@/utilities/calander-utility";

const selectTransactionState = (state) => state.transaction;

const selectRawExpenseData = createSelector(
  [selectTransactionState],
  (transaction) => transaction.expenseData,
);

const selectRawIncomeData = createSelector(
  [selectTransactionState],
  (transaction) => transaction.incomeData,
);

const selectRawRecurringExpenseData = createSelector(
  [selectTransactionState],
  (transaction) => transaction.recurringData,
);

const selectRawRecentTransactions = createSelector(
  [selectTransactionState],
  (transaction) => transaction.recentTransactions,
);

/**
 ** Memoized selectors that return the processed, ready-to-use lists
 * =====================================================================
 * @see ArrayCheck - ensure it returns [] if null
 ** so that.... If state variable is [] (an empty array), [].map() is perfectly safe to run without giving error.
 */

export const selectExpenseList = createSelector(
  [selectRawExpenseData],
  (expenseData) => ArrayCheck(expenseData) || [],
);

export const selectIncomeList = createSelector(
  [selectRawIncomeData],
  (incomeData) => ArrayCheck(incomeData) || [],
);

export const selectRecurringExpenseList = createSelector(
  [selectRawRecurringExpenseData],
  (recurringData) => ArrayCheck(recurringData) || [],
);

export const selectRecentTransactionsList = createSelector(
  [selectRawRecentTransactions],
  (recentData) => ArrayCheck(recentData) || [],
);

export const selectRecurringTotals = createSelector(
  [selectRecurringExpenseList, selectCurrentFilter],
  (recurringList) => {
    if (!recurringList) return { monthly: 0, yearly: 0, total: 0 };

    // 2. Filter for monthly expenses
    const byMonth = recurringList
      .filter((m) => m.isReccuringBy === 1)
      .reduce((total, item) => total + item.ofAmount, 0);

    // 3. Filter for yearly expenses
    const byYear = recurringList
      .filter((m) => m.isReccuringBy === 2)
      .reduce((total, item) => total + item.ofAmount, 0);

    return { monthly: byMonth, yearly: byYear, total: byMonth + byYear };
  },
);

export const selectRecurringChartData = createSelector(
  [selectRecurringExpenseList, selectRecurringTotals],
  (recurringList, rcTotal) => {
    if (!recurringList || !rcTotal) return [];

    // Start with a 12-month array where each month has the base 'byMonth' total
    let monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      expense: rcTotal.byMonth,
    }));

    // Get the specific 'byYear' expenses
    const yearlyExpenses = recurringList
      .filter((r) => r.isReccuringBy === 2)
      .map((r) => ({
        month: moment(r.onDate).month(),
        total: r.ofAmount,
      }));

    // Add the yearly totals to their corresponding months
    monthlyTotals = monthlyTotals.map((item) => {
      const totalForMonth = yearlyExpenses
        .filter((entry) => entry.month === item.month)
        .reduce((sum, entry) => sum + entry.total, 0);
      return { ...item, expense: item.expense + totalForMonth };
    });

    // Format for the chart
    return monthlyTotals.map((a) => ({
      amount: a.expense,
      month: getMonthName(a.month, "MMMM"),
    }));
  },
);
