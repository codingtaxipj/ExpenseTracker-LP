import {
  selectRecurringChartData,
  selectRecurringExpenseList,
  selectRecurringTotals,
} from "@/redux/selectors/transaction-selector";
import { useSelector } from "react-redux";

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
