import { filterByExpense, filterByIncome } from "@/components/utilityFilter";
import { CurrentYear, getMonthName } from "@/utilities/calander-utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getBudgetExpPercent } from "./useBudgetConfig";

const useTotalConfig = () => {
  const TotalData = useSelector((state) => state.total.data);

  const TotalByYear = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      total: m.total,
      isTypeExpense: m.isTypeExpense,
    }));
  }, [TotalData]);
  const TotalByYear_EXP = filterByExpense(TotalByYear);
  const TotalByYear_INC = filterByIncome(TotalByYear);

  //NOTE - gets the total of given year (mostly used card)
  const getTotalOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.total ?? [];

  const TotalByMonth = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      monthList: m.monthList,
      isTypeExpense: m.isTypeExpense,
    }));
  }, [TotalData]);
  const TotalByMonth_EXP = filterByExpense(TotalByMonth);
  const TotalByMonth_INC = filterByIncome(TotalByMonth);

  //NOTE - gets the monthList of given year (mostly used in graph)
  const getMonthListOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.monthList ?? [];

  //NOTE - gets the total in month of given year (mostly used card)
  const getTotalInMonthOfYear = (list, year, month) =>
    getMonthListOfYear(list, year)?.find((l) => l.month === month)?.total ?? [];

  const YearsList = useMemo(() => {
    if (!Array.isArray(TotalData)) return [];
    return [...new Set(TotalData.map((m) => m.year))];
  }, [TotalData]);

  const createIncomeWithExpense = (income, expense) => {
    const arr = [];
    for (let j = 0; j < 12; j++) {
      let i = income?.find((b) => b.month === j)?.total ?? 0;
      let e = expense?.find((e) => e.month === j)?.total ?? 0;
      arr.push({
        id: j,
        month: getMonthName(j, "MMMM"),
        income: i,
        expense: e,
        percent: e == 0 || i == 0 ? "00.00" : getBudgetExpPercent(i, e),
      });
    }

    return arr;
  };

  const TotalByPrime = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      primeList: m.primeList,
      isTypeExpense: m.isTypeExpense,
    }));
  }, [TotalData]);
  const TotalByPrime_EXP = filterByExpense(TotalByPrime);
  const TotalByPrime_INC = filterByIncome(TotalByPrime);

  const getPrimeListOfYear = (list, year = CurrentYear()) =>
    list?.find((l) => l.year === year)?.primeList ?? [];

  const TotalBySub = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      subList: m.subList,
      isTypeExpense: m.isTypeExpense,
    }));
  }, [TotalData]);
  const TotalBySub_EXP = filterByExpense(TotalBySub);
  const TotalBySub_INC = filterByIncome(TotalBySub);
  const getSubListOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.subList ?? [];

  console.log("primeT", TotalByYear_EXP);

  //console.log("MM", TotalOfMonthList);
  return {
    YearsList,
    TotalByMonth_EXP,
    TotalByMonth_INC,
    getMonthListOfYear,
    getTotalInMonthOfYear,
    TotalByYear_EXP,
    TotalByYear_INC,
    getTotalOfYear,
    createIncomeWithExpense,
    TotalByPrime_EXP,
    TotalByPrime_INC,
    getPrimeListOfYear,
    TotalBySub_EXP,
    TotalBySub_INC,
    getSubListOfYear,
  };
};

export default useTotalConfig;
