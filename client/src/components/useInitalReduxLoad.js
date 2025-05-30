import { setDataExpense, setDataIncome } from "@/redux/slices/configExpense";
import { fetchAllData } from "@/redux/slices/getExpense";
import { fetchMaxData } from "@/redux/slices/getMaxExpense";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByExpense, sortByDateNewest } from "./utilityFilter";

const useInitalReduxLoad = () => {
  //NOTE: inital fetch by redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchMaxData());
  }, [dispatch]);

  const incomingData = useSelector((state) => state.expense.data);

  //NOTE: filtering data by type income or expense
  useEffect(() => {
    if (incomingData) {
      const expList = filterByExpense(incomingData);
      const sortedExpList = sortByDateNewest(expList);
      dispatch(setDataExpense(sortedExpList));
      const incList = filterByExpense(incomingData);
      const sortedIncList = sortByDateNewest(incList);
      dispatch(setDataIncome(sortedIncList));
    }
  }, [incomingData, dispatch]);

  const expenseData = useSelector((state) => state.configExpense.dataExpense);
  const incomeData = useSelector((state) => state.configExpense.dataIncome);

  return {
    incomingData,
    expenseData,
    incomeData,
  };
};

export default useInitalReduxLoad;
