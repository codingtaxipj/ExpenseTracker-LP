import { filterMyData } from "@/redux/slices/configExpense";
import { filterMaxData } from "@/redux/slices/configMaxExpense";
import { fetchAllData } from "@/redux/slices/getExpense";
import { fetchMaxData } from "@/redux/slices/getMaxExpense";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useInitalReduxLoad = (parameters = {}) => {
  const {
    isExpenseData = null,
    isExpenseMaxData = null,
    isPrimeCategory = null,
  } = parameters;

  //NOTE: inital fetch by redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchMaxData());
  }, [dispatch]);

  const incomingData = useSelector((state) => state.expense.data);
  const maxExpenseData = useSelector((state) => state.maxExpense.data);

  //NOTE: filtering data by type income or expense
  useEffect(() => {
    if (incomingData && isExpenseData !== null) {
      dispatch(
        filterMyData({ data: incomingData, filterValue: isExpenseData }),
      );
    }
  }, [dispatch, incomingData, isExpenseData]);

  const expenseData = useSelector((state) => state.configExpense.dataExpense);
  const incomeData = useSelector((state) => state.configExpense.dataIncome);

  //NOTE: filtering Max income and expense data by type
  useEffect(() => {
    if (maxExpenseData && isExpenseMaxData !== null) {
      dispatch(
        filterMaxData({
          data: maxExpenseData,
          filterByValue: isExpenseMaxData,
          filterByCategory: isPrimeCategory,
        }),
      );
    }
  }, [dispatch, maxExpenseData, isExpenseMaxData, isPrimeCategory]);

  const expenseMaxData = useSelector(
    (state) => state.configMaxExpense.maxExpenseData,
  );
  const incomeMaxData = useSelector(
    (state) => state.configMaxExpense.maxIncomeData,
  );

  return {
    maxExpenseData,
    incomingData,
    expenseData,
    incomeData,
    expenseMaxData,
    incomeMaxData,
  };
};

export default useInitalReduxLoad;
