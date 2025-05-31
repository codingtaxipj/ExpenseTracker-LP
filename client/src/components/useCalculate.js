import { useEffect, useMemo } from "react";
import {
  getEntriesOfYear,
  getEntriesOfMonth,
  getEntriesOfPrimeCat,
  getEntriesOfSubCat,
  getTotalOfEntries,
  getPrimeCategories,
  getSubCategories,
} from "./utility";
import { getUniqueMonths, getUniqueYears } from "./utilityCalculate";
import { useDispatch } from "react-redux";
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
import { expenseCategories } from "@/global/icon-data";

const useCalculate = (incomingData, isExpense) => {
  const dispatch = useDispatch();
  const listData = useMemo(() => [...incomingData].reverse(), [incomingData]);
  const uniqueYears = useMemo(() => getUniqueYears(listData), [listData]);

  const primeCat = getPrimeCategories(expenseCategories);
  const subCat = getSubCategories(expenseCategories);

  const TotalData = {
    Y: {},
    PC: {},
    SC: {},
    M: {},
    W: {},
  };

  for (let years of uniqueYears) {
    //NOTE initalize here

    TotalData.M[years] = {};
    TotalData.W[years] = {};
    TotalData.PC[years] = {};
    TotalData.SC[years] = {};

    //NOTE : get total of years unique
    const listOfYear = getEntriesOfYear(listData, years);
    TotalData.Y[years] = {
      total: getTotalOfEntries(listData),
    };

    //NOTE : Unique PC total Data by Year
    for (let prime of primeCat) {
      const listOfPrime = getEntriesOfPrimeCat(listOfYear, prime);
      TotalData.PC[years][prime] = {
        total: getTotalOfEntries(listOfPrime),
      };
    }

    //NOTE : Unique SC total Data by Year
    for (let sub of subCat) {
      const listOfSub = getEntriesOfSubCat(listOfYear, sub);
      TotalData.SC[years][sub] = {
        total: getTotalOfEntries(listOfSub),
      };
    }

    //NOTE : get total of months in years unique
    const uniqueMonths = getUniqueMonths(listOfYear);
    for (let month of uniqueMonths) {
      const listOfMonth = getEntriesOfMonth(listOfYear, month);

      TotalData.M[years][month] = {
        total: getTotalOfEntries(listOfMonth),
      };

      TotalData.PC[years][month] = {};
      TotalData.SC[years][month] = {};

      //NOTE : Unique PC total Data by month
      for (let prime of primeCat) {
        const listOfPrime = getEntriesOfPrimeCat(listOfMonth, prime);
        TotalData.PC[years][month][prime] = {
          total: getTotalOfEntries(listOfPrime),
        };
      }

      //NOTE : Unique SC total Data by month
      for (let sub of subCat) {
        const listOfSub = getEntriesOfSubCat(listOfMonth, sub);
        TotalData.SC[years][month][sub] = {
          total: getTotalOfEntries(listOfSub),
        };
      }
    }
  }

  useEffect(() => {
    if (isExpense) {
      dispatch(setExpenseYearsTotal(TotalData.Y));
      dispatch(setExpenseMonthsTotal(TotalData.M));
      dispatch(setExpensePrimeTotal(TotalData.PC));
      dispatch(setExpenseSubTotal(TotalData.SC));
    } else {
      dispatch(setIncomeYearsTotal(TotalData.Y));
      dispatch(setIncomeMonthsTotal(TotalData.M));
      dispatch(setIncomePrimeTotal(TotalData.PC));
      dispatch(setIncomeSubTotal(TotalData.SC));
    }
  }, [
    dispatch,
    TotalData.Y,
    TotalData.M,
    TotalData.W,
    TotalData.PC,
    TotalData.SC,
    isExpense,
  ]);
};

export default useCalculate;
