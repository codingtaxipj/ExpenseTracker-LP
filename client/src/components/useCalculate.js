import { useEffect, useMemo } from "react";
import {
  getEntriesOfYear,
  getEntriesOfMonth,
  getEntriesOfWeek,
  getEntriesOfSubCat,
  getEntriesOfSubCat,
  getTotalOfEntries,
} from "./utility";
import {
  getMonthTotal,
  getUniqueMonths,
  getUniqueWeeks,
  getUniqueYears,
  getWeekTotal,
  getYearTotal,
} from "./utilityCalculate";
import { useDispatch } from "react-redux";
import {
  setMonthsTotal,
  setWeeksTotal,
  setYearsTotal,
} from "@/redux/slices/configTotal";
import { expenseCategories } from "@/global/icon-data";

const useCalculate = incomingData => {
  const dispatch = useDispatch();
  const listData = useMemo(() => [...incomingData].reverse(), [incomingData]);
  const uniqueYears = useMemo(() => getUniqueYears(listData), [listData]);

  export const getPrimeCategories = list => [
    ...new Set(Object.values(list).map(item => item.thisCategoryTitle)),
  ];

  export const getSubCategories = list => {
    const L1 = Object.values(expenseCategories);
    const L2 = L1.map(cc =>
      Object.keys(cc).filter(k => k !== "thisCategoryTitle")
    );
    return [...new Set(L2.flat())];
  };

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

    //NOTE : get total of weeks in years unique
    const uniqueWeeks = getUniqueWeeks(listOfYear);
    for (let week of uniqueWeeks) {
      const listOfWeek = getEntriesOfWeek(listOfYear, week);
      TotalData.W[years][week] = {
        total: getTotalOfEntries(listOfWeek),
      };

      TotalData.PC[years][week] = {};
      TotalData.SC[years][week] = {};

      //NOTE : Unique PC total Data by week
      for (let prime of primeCat) {
        const listOfPrime = getEntriesOfPrimeCat(listOfWeek, prime);
        TotalData.PC[years][week][prime] = {
          total: getTotalOfEntries(listOfPrime),
        };
      }
      //NOTE : Unique SC total Data by week
      for (let sub of subCat) {
        const listOfSub = getEntriesOfSubCat(listOfWeek, sub);
        TotalData.SC[years][week][sub] = {
          total: getTotalOfEntries(listOfSub),
        };
      }
    }
  }

  if (Object.keys(TotalData).length > 0) {
    dispatch(setYearsTotal(TotalData.Y));
    dispatch(setMonthsTotal(TotalData.M));
    dispatch(setWeeksTotal(TotalData.W));
  }

  useEffect(() => {}, [dispatch, listData, uniqueYears]);
};

export default useCalculate;
