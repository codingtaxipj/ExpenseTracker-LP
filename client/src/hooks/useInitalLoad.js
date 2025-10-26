import { fetchBudget } from "@/redux/slices/budget-slice";
import { fetchMM } from "@/redux/slices/minmax-slice";
import { fetchTotal } from "@/redux/slices/total-slice";
import {
  fetchExpense,
  fetchIncome,
  fetchRecurringExpense,
} from "@/redux/slices/transaction-slice";
import { fetchTrips } from "@/redux/slices/trip-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useInitalLoad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecurringExpense());
    dispatch(fetchExpense());
    dispatch(fetchIncome());
    dispatch(fetchBudget());
    dispatch(fetchTotal());
    dispatch(fetchMM());
    dispatch(fetchTrips());
  }, [dispatch]);
};

export default useInitalLoad;
