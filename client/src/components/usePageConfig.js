import { useEffect, useState } from "react";
import useInitalReduxLoad from "./useInitalReduxLoad";
import useCalculate from "./useCalculate";

const usePageConfig = () => {
  const { incomeData, expenseData } = useInitalReduxLoad();

  const isExpense = true;
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
    if (incomeData)
      setDataConfig((prev) => ({
        ...prev,
        income: { entries: incomeData, loading: false },
      }));
  }, [incomeData]);

  useEffect(() => {
    if (expenseData)
      setDataConfig((prev) => ({
        ...prev,
        expense: { entries: expenseData, loading: false },
      }));
  }, [expenseData]);

  useCalculate(dataConfig.income.entries, !isExpense);
  useCalculate(dataConfig.expense.entries, isExpense);

  return { dataConfig };
};

export default usePageConfig;
