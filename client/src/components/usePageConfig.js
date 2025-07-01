import { useEffect, useState } from "react";
import useInitalReduxLoad from "./useInitalReduxLoad";
import calculateTotal from "./calculateTotal";
import { useDispatch } from "react-redux";
import { expenseCategories, incomeCategories } from "@/global/categories";

const usePageConfig = () => {
  const dispatch = useDispatch();
  const { incomeData, expenseData, isExpense } = useInitalReduxLoad();



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

  return { dataConfig, isExpense };
};

export default usePageConfig;
