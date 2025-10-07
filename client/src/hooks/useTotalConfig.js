import { CurrentYear, getMonthName } from "@/utilities/calander-utility";
import { useSelector } from "react-redux";
import { getBudgetExpPercent } from "./useBudgetConfig";

import {
  selectYearsList,
  selectExpenseTotal_ByYear,
  selectExpenseTotal_ByMonth,
  selectExpenseTotal_ByPrime,
  selectExpenseTotal_BySub,
  selectIncomeTotal_ByYear,
  selectIncomeTotal_ByMonth,
  selectIncomeTotal_ByPrime,
  selectIncomeTotal_BySub,
} from "@/redux/slices/total-slice";

const useTotalConfig = () => {
  const { TotalLoading, TotalError } = useSelector((state) => state.total);
  // YEAR LIST
  const YearsList = useSelector(selectYearsList);
  // EXPENSE
  const TotalByYear_EXP = useSelector(selectExpenseTotal_ByYear);
  const TotalByMonth_EXP = useSelector(selectExpenseTotal_ByMonth);
  const TotalByPrime_EXP = useSelector(selectExpenseTotal_ByPrime);
  const TotalBySub_EXP = useSelector(selectExpenseTotal_BySub);
  // INCOME
  const TotalByYear_INC = useSelector(selectIncomeTotal_ByYear);
  const TotalByMonth_INC = useSelector(selectIncomeTotal_ByMonth);
  const TotalByPrime_INC = useSelector(selectIncomeTotal_ByPrime);
  const TotalBySub_INC = useSelector(selectIncomeTotal_BySub);

  //NOTE - gets the total of given year (mostly used card)
  const getTotalOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.total ?? 0;
  //NOTE - gets the monthList of given year (mostly used in graph)
  const getMonthListOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.monthList ?? [];
  const getPrimeListOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.primeList ?? [];
  const getSubListOfYear = (list, year) =>
    list?.find((l) => l.year === year)?.subList ?? [];
  //NOTE - gets the total in month of given year (mostly used card)
  const getTotalInMonthOfYear = (list, year, month) =>
    getMonthListOfYear(list, year)?.find((l) => l.month === month)?.total ?? 0;

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

  const sortByMax = (list = []) =>
    [...list].sort((a, b) => b.total - a.total).slice(0, 5);

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
    sortByMax,
    TotalLoading,
    TotalError,
  };
};

export default useTotalConfig;
