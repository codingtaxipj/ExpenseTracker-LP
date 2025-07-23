import { fetchBudget } from "@/redux/slices/budget-slice";
import { fetchTotal } from "@/redux/slices/fetch-total";
import { fetchMM } from "@/redux/slices/minmax-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useInitalLoad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBudget());
    dispatch(fetchTotal());
    dispatch(fetchMM());
  }, [dispatch]);
};

export default useInitalLoad;
