import { useSelector } from "react-redux";
import {
  selectRecurringExpenseList,
  selectRecurringTotals,
  selectRecurringChartData,
} from "@/redux/slices/transaction-slice"; // Import your new selectors

const useRecurringConfig = () => {
  // Directly select the final, memoized data. No useMemo needed.
  const RecurringList = useSelector(selectRecurringExpenseList);
  const rcTotal = useSelector(selectRecurringTotals);
  const recurringChartData = useSelector(selectRecurringChartData);

  // You can still select loading/error states if needed
  const { recurringLoading, recurringError } = useSelector(
    (state) => state.transaction,
  );

  return {
    RecurringList,
    rcTotal,
    recurringChartData,
    recurringLoading,
    recurringError,
  };
};

export default useRecurringConfig;
