import { selectRecurringCalculation } from "@/redux/selectors/total-selector";
import { selectRecurringExpenseList } from "@/redux/selectors/transaction-selector";
import { useSelector } from "react-redux";

const useRecurringConfig = () => {
  // Directly select the final, memoized data. No useMemo needed.
  const RecurringList = useSelector(selectRecurringExpenseList);
  const RecurringData = useSelector(selectRecurringCalculation);

  // You can still select loading/error states if needed
  const { recurringLoading, recurringError } = useSelector(
    (state) => state.transaction,
  );

  return {
    RecurringList,
    RecurringData,
    recurringLoading,
    recurringError,
  };
};

export default useRecurringConfig;
