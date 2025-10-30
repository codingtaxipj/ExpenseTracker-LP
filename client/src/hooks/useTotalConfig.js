import { CurrentYear, getMonthName } from "@/utilities/calander-utility";
import { useSelector } from "react-redux";
import { getBudgetExpPercent } from "./useBudgetConfig";
import {
  selectExpenseTotal_ByMonth,
  selectExpenseTotal_ByPrime,
  selectExpenseTotal_BySub,
  selectExpenseTotal_ByYear,
  selectIncomeTotal_ByMonth,
  selectIncomeTotal_ByPrime,
  selectIncomeTotal_BySub,
  selectIncomeTotal_ByYear,
  selectYearsList,
  TotalOfLastSelectedDays,
  TotalOfLastSelectedMonths,
  TotalOfSelectedMonth,
  TotalOfSelectedYear,
} from "@/redux/selectors/total-selector";
import { selectGraphData } from "@/redux/selectors/graph-selector";
import { useMemo } from "react";

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

  const getTotalTransactionOfEachMonth = (list, year) => {
    const data = list?.find((l) => l.year === year)?.monthList ?? [];
    if (data.length === 0) return [];
    const arr = [];
    for (let j = 0; j < 12; j++) {
      let e = data?.find((m) => m.month === j)?.total ?? 0;
      arr.push({
        month: j,
        amount: e,
      });
    }
    return arr;
  };

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

  const { ExpenseOfYear, IncomeOfYear } = useSelector(TotalOfSelectedYear);
  const { ExpenseOfMonth, IncomeOfMonth } = useSelector(TotalOfSelectedMonth);
  const { ExpenseOfLastMonths, IncomeOfLastMonths } = useSelector(
    TotalOfLastSelectedMonths,
  );
  const { ExpenseOfLastDays, IncomeOfLastDays } = useSelector(
    TotalOfLastSelectedDays,
  );

  const ExpenseInLastMonths = getTotalOfTransaction(ExpenseOfLastMonths);
  const IncomeInLastMonths = getTotalOfTransaction(IncomeOfLastMonths);
  const ExpenseInLastDays = getTotalOfTransaction(ExpenseOfLastDays);
  const IncomeInLastDays = getTotalOfTransaction(IncomeOfLastDays);

  const { ExpenseGraphData, IncomeGraphData } = useSelector(selectGraphData);

  const incomeObj = useMemo(
    () =>
      IncomeGraphData.reduce((newObj, item) => {
        newObj[item.indicator] = item.Amount;
        return newObj;
      }, {}),
    [IncomeGraphData],
  );

  const IncomeExpenseCombo = useMemo(
    () =>
      ExpenseGraphData.map((m, i) => {
        const eAmount = m.Amount;
        const eIndicator = m.indicator;
        const iAmount = incomeObj[eIndicator] || 0;
        return {
          indicator: eIndicator,
          Expense: eAmount,
          Income: iAmount,
          percent:
            eAmount == 0 || iAmount == 0
              ? 0
              : getBudgetExpPercent(iAmount, eAmount),
        };
      }),
    [ExpenseGraphData, incomeObj],
  );

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

    ExpenseOfYear,
    IncomeOfYear,
    ExpenseOfMonth,
    IncomeOfMonth,
    ExpenseInLastMonths,
    IncomeInLastMonths,
    ExpenseInLastDays,
    IncomeInLastDays,
    IncomeExpenseCombo,
  };
};

export default useTotalConfig;

const getTotalOfTransaction = (l) =>
  l.reduce((sum, e) => sum + e.amount, 0) ?? 0;
