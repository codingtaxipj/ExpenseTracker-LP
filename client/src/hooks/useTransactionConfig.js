import {
  selectExpenseList,
  selectIncomeList,
  selectRecentTransactionsList,
} from "@/redux/selectors/transaction-selector";
import { useSelector } from "react-redux";

const useTransactionConfig = () => {
  const {
    expenseLoading,
    expenseError,
    incomeLoading,
    incomeError,
    recentTransactionsLoading,
  } = useSelector((state) => state.transaction);

  // Directly select the pre-processed lists. No useMemo needed!
  const ExpenseList = useSelector(selectExpenseList);
  const IncomeList = useSelector(selectIncomeList);
  const RecentTransactionList = useSelector(selectRecentTransactionsList);

  return {
    ExpenseList,
    IncomeList,
    expenseLoading,
    expenseError,
    incomeLoading,
    incomeError,
    RecentTransactionList,
    recentTransactionsLoading,
  };
};

export default useTransactionConfig;
