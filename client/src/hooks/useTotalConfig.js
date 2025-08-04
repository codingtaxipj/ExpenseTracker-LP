import {
  filterByExpense,
  filterByIncome,
  filterByYear,
} from "@/components/utilityFilter";
import { CurrentYear } from "@/utilities/calander-utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useTotalConfig = () => {
  const TotalData = useSelector((state) => state.total.data);
  console.log("YYDB", TotalData);
  const TotalByYear = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      total: m.total,
      isTypeExpense: m.isTypeExpense,
    }));
  }, [TotalData]);

  console.log("TY", TotalByYear);

  const TotalByCurrYear = filterByYear(TotalByYear, CurrentYear());
  const TotalByCurrYear_EXP = filterByExpense(TotalByCurrYear);

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

  const YearsList = useMemo(() => {
    if (!Array.isArray(TotalData)) return [];
    return [...new Set(TotalData.map((m) => m.year))];
  }, [TotalData]);

  //console.log("MM", TotalOfMonthList);
  return {
    YearsList,
    TotalByMonth_EXP,
    TotalByMonth_INC,
    getMonthListOfYear,
  };
};

export default useTotalConfig;
