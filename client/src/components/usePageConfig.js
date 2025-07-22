import { useEffect, useState } from "react";
import useInitalReduxLoad from "../hooks/useInitalReduxLoad";
import calculateTotal from "./calculateTotal";
import { useDispatch } from "react-redux";
import { expenseCategories, incomeCategories } from "@/global/categories";
import moment from "moment";

const usePageConfig = () => {
  const dispatch = useDispatch();
  const { incomeData, expenseData, isExpense, totalData } =
    useInitalReduxLoad();

  const [currYearData, setCurrYearData] = useState([]);
  const [currYearTotalExpense, setCurrYearTotalExpense] = useState(0);

  useEffect(() => {
    if (totalData.length > 0) {
      const currYearTotal = totalData.find(
        (list) => list.year === moment().year(),
      );
      if (currYearTotal) {
        setCurrYearData(currYearTotal.monthList);
        setCurrYearTotalExpense(currYearTotal.total);
      }
    }
  }, [totalData]);

  const [dataConfig, setDataConfig] = useState({
    income: {
      entries: [],
      loading: true,
    },
    expense: {
      entries: [],
      loading: true,
    },
  });

  useEffect(() => {
    if (expenseData.length > 0) {
      setDataConfig((prev) => ({
        ...prev,
        expense: { entries: expenseData, loading: false },
      }));
      calculateTotal(dispatch, expenseData, true, expenseCategories);
    }
  }, [expenseData, dispatch]);

  useEffect(() => {
    if (incomeData.length > 0)
      setDataConfig((prev) => ({
        ...prev,
        income: { entries: incomeData, loading: false },
      }));
    calculateTotal(dispatch, incomeData, false, incomeCategories);
  }, [incomeData, dispatch]);

  return {
    dataConfig,
    isExpense,

    currYearData,
    currYearTotalExpense,
  };
};

export default usePageConfig;
