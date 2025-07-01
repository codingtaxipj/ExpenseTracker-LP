import { setDataExpense, setDataIncome } from "@/redux/slices/configExpense";
import { fetchAllData } from "@/redux/slices/getExpense";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByExpense,
  filterByIncome,
  sortByDateNewest,
} from "./utilityFilter";

const useInitalReduxLoad = () => {
  const isExpense = true;
  //NOTE: inital fetch by redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  const incomingData = useSelector((state) => state.expense.data) || false;

  //NOTE: filtering data by type income or expense
  useEffect(() => {
    if (incomingData) {
      const expList = filterByExpense(incomingData);
      const sortedExpList = sortByDateNewest(expList);
      dispatch(setDataExpense(sortedExpList));
      const incList = filterByIncome(incomingData);
      const sortedIncList = sortByDateNewest(incList);
      dispatch(setDataIncome(sortedIncList));
    }
  }, [incomingData, dispatch]);

  const expenseData =
    useSelector((state) => state.configExpense.dataExpense) || false;
  const incomeData =
    useSelector((state) => state.configExpense.dataIncome) || false;

  return {
    incomingData,
    expenseData,
    incomeData,
    isExpense,
  };
};

export default useInitalReduxLoad;
