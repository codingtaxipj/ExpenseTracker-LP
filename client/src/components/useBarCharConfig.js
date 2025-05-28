import moment from "moment";
import { useEffect, useState } from "react";

import {
  sortByYearAsMonths,
  Graph,
  sortByMonthAsWeeks,
  sortByMonthAsDates,
  sortByWeekAsDates,
  getEntriesOfYear,
  getEntryDatesData,
  getYearObjArray,
  getMonthObjArray,
  getWeekObjArray,
} from "./utility";

const useBarCharConfig = (entries, isExpense) => {
  const [filter, setFilter] = useState({
    byYear: moment().year(),
    byMonth: moment().month(),
    byWeek: moment().week(),
  });
  const [showGraphBy, setShowGraphBy] = useState(Graph.byYear);
  const [GraphConfig, setGraphConfig] = useState({
    Title: "",
    SubText: "",
    BottomText: "",
    barLabel: "",
    barColor: "",
    barBtnStyle: "",
    graphData: [],
    graphDataByYear: [],
    arrayOf: null,
    years: 0,
    months: 0,
    weeks: 0,
  });

  useEffect(() => {
    const data = getEntryDatesData(entries);

    setGraphConfig((prev) => ({
      ...prev,
      arrayOf: data,
    }));
  }, [entries]);

  useEffect(() => {
    if (GraphConfig.arrayOf !== null) {
      const yearsArr = getYearObjArray(
        GraphConfig.arrayOf.year.start,
        GraphConfig.arrayOf.year.end,
      );
      const monthsArr = getMonthObjArray(
        GraphConfig.arrayOf.month.start,
        GraphConfig.arrayOf.month.end,
      );

      const weekArr = getWeekObjArray(
        GraphConfig.arrayOf.week.start,
        GraphConfig.arrayOf.week.end,
      );
      setGraphConfig((prev) => ({
        ...prev,
        years: yearsArr,
        months: monthsArr,
        weeks: weekArr,
      }));
    }
  }, [GraphConfig.arrayOf]);

  useEffect(() => {
    if (isExpense) {
      setGraphConfig((prev) => ({
        ...prev,
        barColor: "var(--color-expense)",
        Title: "Your Expense",
      }));
    } else {
      setGraphConfig((prev) => ({
        ...prev,
        barColor: "var(--color-income)",
        Title: "Your Income",
      }));
    }
  }, [isExpense]);

  useEffect(() => {
    const YearList = getEntriesOfYear(entries, filter.byYear);
    setGraphConfig((prev) => ({
      ...prev,
      graphDataByYear: YearList,
    }));
  }, [filter.byYear, entries]);

  useEffect(() => {
    if (showGraphBy === Graph.byYear) {
      const data = sortByYearAsMonths(GraphConfig.graphDataByYear);
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Year ${filter.byYear} in Months.`,
        BottomText: `${GraphConfig.Title} By Months in Year`,
      }));
    }
    if (showGraphBy === Graph.byMonth.asWeek) {
      const data = sortByMonthAsWeeks(
        GraphConfig.graphDataByYear,
        filter.byMonth,
      );
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `${moment().month(filter.byMonth).format("MMMM")}, ${filter.byYear} in Weeks`,
        BottomText: `${GraphConfig.Title} By Weeks in Month `,
      }));
    }
    if (showGraphBy === Graph.byMonth.asDate) {
      const data = sortByMonthAsDates(
        GraphConfig.graphDataByYear,
        filter.byMonth,
      );
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment().month(filter.byMonth).format("MMMM")}, ${filter.byYear}`,
        BottomText: `${GraphConfig.Title} in Month on Dates `,
      }));
    }

    if (showGraphBy === Graph.byWeek) {
      const data = sortByWeekAsDates(
        GraphConfig.graphDataByYear,
        filter.byWeek,
      );
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment().week(filter.byWeek).format("Do")} Week of Year ${filter.byYear}`,
        BottomText: `${GraphConfig.Title}  in Week by Dates `,
      }));
    }
  }, [
    entries,
    filter,
    showGraphBy,
    GraphConfig.graphDataByYear,
    GraphConfig.Title,
  ]);

  const handleShowMonthIn = (value) => {
    if (value === Graph.inMonth.asWeek) {
      setShowGraphBy(Graph.byMonth.asWeek);
    } else {
      setShowGraphBy(Graph.byMonth.asDate);
    }
  };
  const handleSelectYear = (val) => {
    setFilter((prev) => ({
      ...prev,
      byYear: Number(val),
    }));
  };
  const handleSelectMonth = (val) => {
    setFilter((prev) => ({
      ...prev,
      byMonth: Number(val),
    }));
  };
  const handleSelectWeek = (val) => {
    setFilter((prev) => ({
      ...prev,
      byWeek: Number(val),
    }));
  };

  return {
    Graph,
    filter,
    showGraphBy,
    setShowGraphBy,
    GraphConfig,
    handleShowMonthIn,
    handleSelectYear,
    handleSelectMonth,
    handleSelectWeek,
  };
};

export default useBarCharConfig;
