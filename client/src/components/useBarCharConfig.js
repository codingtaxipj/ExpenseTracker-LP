import moment from "moment";
import { useEffect, useState } from "react";

import {
  sortByYearAsMonths,
  Graph,
  sortByMonthAsWeeks,
  sortByMonthAsDates,
  getEntriesOfYear,
} from "./utility";
import {
  getUniqueMonths,
  getUniqueWeeks,
  getUniqueYears,
} from "./utilityCalculate";

const useBarCharConfig = (entries, isExpense) => {
  const [filter, setFilter] = useState({
    byYear: moment().year(),
    byMonth: moment().month(),
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
    entriesByYear: [],
    years: [],
    months: [],
    weeks: [],
  });

  useEffect(() => {
    const reversed = [...entries].reverse();
    const entriesByYear = getEntriesOfYear(reversed, filter.byYear);
    const months = getUniqueMonths(entriesByYear);
    const weeks = getUniqueWeeks(entriesByYear);

    setGraphConfig((prev) => ({
      ...prev,
      entriesByYear,
      months,
      weeks,
      years: getUniqueYears(reversed),
    }));
  }, [entries, filter.byYear]);

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
    const setDefaultMonth =
      GraphConfig.months.find((item) => item === filter.byMonth) ||
      GraphConfig.months[0];

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
        setDefaultMonth,
      );
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `${moment().month(setDefaultMonth).format("MMMM")}, ${filter.byYear} in Weeks`,
        BottomText: `${GraphConfig.Title} By Weeks in Month `,
      }));
    }
    if (showGraphBy === Graph.byMonth.asDate) {
      const data = sortByMonthAsDates(
        GraphConfig.graphDataByYear,
        setDefaultMonth,
      );
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment().month(setDefaultMonth).format("MMMM")}, ${filter.byYear}`,
        BottomText: `${GraphConfig.Title} in Month on Dates `,
      }));
    }
  }, [
    entries,
    filter,
    showGraphBy,
    GraphConfig.graphDataByYear,
    GraphConfig.Title,
    GraphConfig.months,
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

  return {
    Graph,
    filter,
    showGraphBy,
    setShowGraphBy,
    GraphConfig,
    handleShowMonthIn,
    handleSelectYear,
    handleSelectMonth,
  };
};

export default useBarCharConfig;
