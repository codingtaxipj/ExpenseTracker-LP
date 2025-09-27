import {
  selectExpenseList,
  selectIncomeList,
} from "@/redux/slices/transaction-slice";
import { useSelector } from "react-redux";

const useTransactionConfig = () => {
  const { expenseLoading, expenseError, incomeLoading, incomeError } =
    useSelector((state) => state.transaction);

  // Directly select the pre-processed lists. No useMemo needed!
  const ExpenseList = useSelector(selectExpenseList);
  const IncomeList = useSelector(selectIncomeList);

  return {
    ExpenseList,
    IncomeList,
    expenseLoading,
    expenseError,
    incomeLoading,
    incomeError,
  };
};

export default useTransactionConfig;
