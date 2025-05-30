import { useEffect, useMemo } from "react";
import { getEntriesOfYear } from "./utility";
import {
  getMonthTotal,
  getUniqueMonths,
  getUniqueWeeks,
  getUniqueYears,
  getWeekTotal,
  getYearTotal,
} from "./utilityCalculate";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonthsTotal,
  setWeeksTotal,
  setYearsTotal,
} from "@/redux/slices/configTotal";

const useCalculate = (incomingData) => {
  const dispatch = useDispatch();
  const listData = useMemo(() => [...incomingData].reverse(), [incomingData]);
  const uniqueYears = useMemo(() => getUniqueYears(listData), [listData]);

  useEffect(() => {
    //NOTE : get total of years unique
    const yearTotalData = { hasData: false };
    if (listData.length > 0) {
      for (let years of uniqueYears) {
        yearTotalData[years] = {
          total: getYearTotal(listData, years),
        };
      }
      yearTotalData.hasData = true;
    }
    if (yearTotalData.hasData) {
      dispatch(setYearsTotal(yearTotalData));
    }

    //NOTE : get total of weeks in years unique

    const weeksTotalData = { hasData: false };
    if (listData.length > 0) {
      for (let years of uniqueYears) {
        const listOfYear = getEntriesOfYear(listData, years);
        const uniqueWeeks = getUniqueWeeks(listOfYear);
        weeksTotalData[years] = {};
        for (let weeks of uniqueWeeks) {
          weeksTotalData[years][weeks] = {
            total: getWeekTotal(listOfYear, weeks),
          };
        }
      }
      weeksTotalData.hasData = true;
    }
    if (weeksTotalData.hasData) {
      dispatch(setWeeksTotal(weeksTotalData));
    }

    //NOTE : get total of months in years unique

    const monthsTotalData = { hasData: false };
    if (listData.length > 0) {
      for (let years of uniqueYears) {
        const listOfYear = getEntriesOfYear(listData, years);
        const uniqueMonths = getUniqueMonths(listOfYear);
        monthsTotalData[years] = {};
        for (let month of uniqueMonths) {
          monthsTotalData[years][month] = {
            total: getMonthTotal(listOfYear, month),
          };
        }
      }
      monthsTotalData.hasData = true;
    }
    if (monthsTotalData.hasData) {
      dispatch(setMonthsTotal(monthsTotalData));
    }
  }, [dispatch, listData, uniqueYears]);

  const yearsData = useSelector((state) => state.configTotal.byYear);
  const monthsData = useSelector((state) => state.configTotal.byMonth);
  const weeksData = useSelector((state) => state.configTotal.byWeek);
};

export default useCalculate;
