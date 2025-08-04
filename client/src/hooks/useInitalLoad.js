import { fetchBudget } from "@/redux/slices/budget-slice";
import { fetchMM } from "@/redux/slices/minmax-slice";
import { fetchTotal } from "@/redux/slices/total-slice";
import { fetchExpense, fetchIncome } from "@/redux/slices/transaction-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useInitalLoad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBudget());
    dispatch(fetchMM());
    dispatch(fetchExpense());
    dispatch(fetchIncome());
    dispatch(fetchTotal());
  }, [dispatch]);
};

export default useInitalLoad;
