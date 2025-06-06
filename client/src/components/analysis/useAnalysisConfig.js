import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import usePageConfig from "../usePageConfig";
import {
  getPrimeCategories,
  expenseCategories,
  getSubOfPrime,
} from "@/global/categories";
import moment from "moment";

const useAnalysisConfig = () => {
  //NOTE :: color codes for pie chart

  const colorPalette = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#ffeb3b",
  ];

  //NOTE :: Initalize Data
  usePageConfig();

  //Note - Filter State variable
  const [filter, setFilter] = useState({
    byYear: String(moment().year()),
    byMonth: String(moment().month()),
    byPrime: expenseCategories[0].title,
  });

  //NOTE :: Getting Total Data
  /*  
  * default format  
  expense: {
    byYear: {}, // [year]:{total:value}
    byMonth: {},[year][month]:{total:value}
    byPrime: {},[year][month][prime]:{total:value} && [year][prime]:{total:value}
    bySub: {},[year][month][sub]:{total:value} && [year][sub]:{total:value}
  },
  income: {
    byYear: {},
    byMonth: {},
    byPrime: {},
    bySub: {},
  }, 


    byYear.[year]:{total:value}
    byMonth.[year][month]:{total:value}
    byPrime.[year][month][prime]:{total:value}
    byPrime.[year][prime]:{total:value}
    bySub.[year][month][sub]:{total:value}
    bySub.[year][sub]:{total:value}
  
  
  */
  const expenseTotal = useSelector((state) => state.configTotal.expense);
  const incomeTotal = useSelector((state) => state.configTotal.income);

  //NOTE :: Initalizing Categories
  const categories = useMemo(() => {
    return {
      prime: getPrimeCategories(expenseCategories),
      sub: getSubOfPrime(filter.byPrime, true),
    };
  }, [filter.byPrime]);

  //NOTE :: Year and Month
  const Years = Object.keys(expenseTotal.byYear) || moment().year();
  const Months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  //NOTE :: loading state

  //NOTE :: set Total Data Expense
  const expense = useMemo(() => {
    return {
      year: expenseTotal.byYear || false,
      month: expenseTotal.byMonth || false,
      prime: expenseTotal.byPrime || false,
      sub: expenseTotal.bySub || false,
    };
  }, [expenseTotal]);

  //NOTE :: set Total Data Income
  const income = useMemo(() => {
    return {
      year: incomeTotal.byYear || false,
      month: incomeTotal.byMonth || false,
      prime: incomeTotal.byPrime || false,
      sub: incomeTotal.bySub || false,
    };
  }, [incomeTotal]);

  //NOTE :: onchangeSelect Functions

  //LINK - For Year
  const handleYearSelector = (val) => {
    console.log("Year is", typeof val);
    setFilter((prev) => ({ ...prev, byYear: val }));
  };
  //LINK - For Month
  const handleMonthSelector = (val) => {
    setFilter((prev) => ({ ...prev, byMonth: val }));
  };
  //LINK - For Prime Category
  const handlePrimeSelector = (val) => {
    setFilter((prev) => ({ ...prev, byPrime: val }));
  };

  return {
    handleYearSelector,
    handleMonthSelector,
    handlePrimeSelector,
    filter,
    categories,
    Years,
    Months,
    expense,
    income,
    colorPalette,
  };
};

export default useAnalysisConfig;
