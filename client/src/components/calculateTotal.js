import {
  getEntriesOfYear,
  getEntriesOfMonth,
  getEntriesOfPrimeCat,
  getEntriesOfSubCat,
  getTotalOfEntries,
} from "./utility";

import {
  setExpenseMonthsTotal,
  setExpenseYearsTotal,
  setIncomeYearsTotal,
  setIncomeMonthsTotal,
  setExpensePrimeTotal,
  setExpenseSubTotal,
  setIncomePrimeTotal,
  setIncomeSubTotal,
} from "@/redux/slices/configTotal";

import {
  getPrimeCategoriesExpense,
  getPrimeCategoriesIncome,
  getSubCategoriesExpense,
  getSubCategoriesIncome,
} from "@/global/categories";
import { getUniqueMonths, getUniqueYears } from "./utilityCalculate";

const calculateTotal = (dispatch, entries, isExpense) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return;
  } else {
    const uniqueYears = getUniqueYears(entries);
    const categories = { prime: {}, sub: {} };
    if (isExpense) {
      categories.prime = getPrimeCategoriesExpense();
      categories.sub = getSubCategoriesExpense();
    } else {
      categories.prime = getPrimeCategoriesIncome();
      categories.sub = getSubCategoriesIncome();
    }
    const total = {
      Y: {},
      PC: {},
      SC: {},
      M: {},
      W: {},
    };

    for (let years of uniqueYears) {
      const listOfYear = getEntriesOfYear(entries, years);
      total.Y[years] = { total: getTotalOfEntries(listOfYear) };

      total.M[years] = {};
      total.W[years] = {};
      total.PC[years] = {};
      total.SC[years] = {};

      for (let prime of categories.prime) {
        const listOfPrime = getEntriesOfPrimeCat(listOfYear, prime);
        total.PC[years][prime] = {
          total: getTotalOfEntries(listOfPrime),
        };
      }

      for (let sub of categories.sub) {
        const listOfSub = getEntriesOfSubCat(listOfYear, sub);
        total.SC[years][sub] = {
          total: getTotalOfEntries(listOfSub),
        };
      }

      const uniqueMonths = getUniqueMonths(listOfYear);
      for (let month of uniqueMonths) {
        const listOfMonth = getEntriesOfMonth(listOfYear, month);
        total.M[years][month] = {
          total: getTotalOfEntries(listOfMonth),
        };

        total.PC[years][month] = {};
        total.SC[years][month] = {};

        for (let prime of categories.prime) {
          const listOfPrime = getEntriesOfPrimeCat(listOfMonth, prime);
          total.PC[years][month][prime] = {
            total: getTotalOfEntries(listOfPrime),
          };
        }

        for (let sub of categories.sub) {
          const listOfSub = getEntriesOfSubCat(listOfMonth, sub);
          total.SC[years][month][sub] = {
            total: getTotalOfEntries(listOfSub),
          };
        }
      }
    }

    if (isExpense) {
      dispatch(setExpenseYearsTotal(total.Y));
      dispatch(setExpenseMonthsTotal(total.M));
      dispatch(setExpensePrimeTotal(total.PC));
      dispatch(setExpenseSubTotal(total.SC));
    } else {
      dispatch(setIncomeYearsTotal(total.Y));
      dispatch(setIncomeMonthsTotal(total.M));
      dispatch(setIncomePrimeTotal(total.PC));
      dispatch(setIncomeSubTotal(total.SC));
    }
  }
};

export default calculateTotal;
