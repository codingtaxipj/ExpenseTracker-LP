// ====================================================================
// ? ++ NEW SECTION: MEMOIZED SELECTORS for Budget ++ ✅
// ====================================================================

import { ArrayCheck } from "@/components/utility";
import { CurrentYear } from "@/utilities/calander-utility";
import { createSelector } from "@reduxjs/toolkit";
import { filterTypes, selectCurrentFilter } from "../slices/filter-slice";

const selectBudgetState = (state) => state.budget;

export const selectBudgetData = createSelector([selectBudgetState], (budget) =>
  ArrayCheck(budget.BudgetData),
);

export const selectBudgetList = createSelector(
  [selectBudgetData, selectCurrentFilter],
  (budget, filter) => {
    if (!budget.length) return [];
    const FilterYear = Number(filter.values.year);
    const finalList = getBudgetListOfYear(budget, FilterYear);
    return finalList;
  },
);

export const selectBudgetByMonth = createSelector(
  [selectBudgetList],
  (list) => {
    const finalList = createBudgetArray(list);
    return finalList;
  },
);

const getBudgetListOfYear = (data, year) => {
  const budgetList = data?.find((b) => b.year === year)?.budgetList;
  if (!budgetList) return [];

  const finalList = budgetList.map((b) => ({
    year: year,
    createdAt: b.createdAt,
    month: b.month,
    amount: b.budget,
  }));

  return finalList;
};

export const createBudgetArray = (list = []) => {
  if (!list.length) return [];
  const year = list[0].year;
  const arr = [];
  let amount = 0;
  let created = null;
  for (let i = 0; i < 12; i++) {
    const matched = list.find((l) => l.month === i);
    if (matched) {
      amount = matched.amount;
      created = matched.createdAt;
    }
    arr.push({
      yera: year,
      amount: amount,
      month: i,
      created: created,
    });
  }
  console.log("list", list);
  console.log("arr", arr);

  return arr;
};
