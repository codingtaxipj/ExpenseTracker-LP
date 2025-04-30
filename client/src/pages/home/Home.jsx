import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarHome from "@/pages/home/SideBarHome";
import { PATH } from "@/router/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "@/redux/slices/getExpense.js";
import { useEffect, useState } from "react";
import { fetchMaxData } from "@/redux/slices/getMaxExpense";
import { setMaxExpenseData } from "@/redux/slices/filterMaxExpense";
import {
  configExpenseData,
  filterExpenseData,
  filterIncomeData,
} from "@/redux/slices/configExpense";

const Home = () => {
  const [loading, setLoading] = useState(true); // Loading state

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllData()); // Fetch expense data on mount
    dispatch(fetchMaxData()); // Fetch max expense data on mount
  }, [dispatch]);

  const formData = useSelector((state) => state.expense.data);
  const maxFormData = useSelector((state) => state.maxExpense.data);

  useEffect(() => {
    if (formData !== null && maxFormData !== null) {
      dispatch(configExpenseData(formData));
      dispatch(setMaxExpenseData(maxFormData));
      dispatch(filterExpenseData());
      dispatch(filterIncomeData());

      setLoading(false);
    }
  }, [formData, maxFormData, dispatch]);

  /*  dispatch(filterExpenseData());
  const xp = dispatch(fetchCurrentMonthExpense());
  console.log(xp); */

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          Loading...
        </div>
      )}
      {!loading && (
        <NavMenu activeBtn={PATH.home}>
          <div className="flex h-full flex-row">
            <Outlet />
            <SideBarHome />
          </div>
        </NavMenu>
      )}
    </>
  );
};

export default Home;
