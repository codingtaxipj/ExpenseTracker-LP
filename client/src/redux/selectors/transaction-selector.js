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


