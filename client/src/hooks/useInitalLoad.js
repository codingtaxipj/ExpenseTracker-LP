import { fetchBudget } from "@/redux/slices/budget-slice";
import { fetchTotal } from "@/redux/slices/fetch-total";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseInitalLoad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBudget());
    dispatch(fetchTotal());
  }, [dispatch]);
};

export default UseInitalLoad;
