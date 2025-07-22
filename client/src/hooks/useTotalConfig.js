import { CurrentYear } from "@/utilities/calander-utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const UseTotalConfig = () => {
  const TotalData = useSelector((state) => state.total.data);

  const TotalOfMonthList = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      monthList: m.monthList,
    }));
  }, [TotalData]);

  const TotalOfYearList = useMemo(() => {
    if (!Array.isArray(TotalData)) return null;
    return TotalData.map((m) => ({
      year: m.year,
      total: m.total,
    }));
  }, [TotalData]);

  const getTotalExpMonthListOfYear = (year) =>
    TotalOfMonthList?.find((l) => l.year === year)?.monthList ?? [];

  const getTotalExpOfMonth = (year, month) =>
    getTotalExpMonthListOfYear(year).find((m) => m.month === month)?.total ??
    null;

  const getTotalExpOfYear = (year) =>
    TotalOfYearList?.find((l) => l.year === year)?.total ?? [];

  //console.log("MM", TotalOfMonthList);
  return {
    TotalOfMonthList,
    TotalOfYearList,
    getTotalExpMonthListOfYear,
    getTotalExpOfYear,
    getTotalExpOfMonth,
  };
};

export default UseTotalConfig;
