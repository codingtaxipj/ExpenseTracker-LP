import { useMemo } from "react";
import { useSelector } from "react-redux";

const useTransactionConfig = () => {
  const ExpenseData = useSelector((state) => state.transaction.expenseData);
  const IncomeData = useSelector((state) => state.transaction.incomeData);

  const ExpenseList = useMemo(() => {
    if (!Array.isArray(ExpenseData)) return null;
    return ExpenseData;
  }, [ExpenseData]);

  const IncomeList = useMemo(() => {
    if (!Array.isArray(IncomeData)) return null;
    return IncomeData;
  }, [IncomeData]);

  console.log("TT",IncomeList);
  

  return { ExpenseList, IncomeList };
};

export default useTransactionConfig;
