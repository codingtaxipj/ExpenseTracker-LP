import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarHome from "@/pages/home/SideBarHome";
import { PATH } from "@/router/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "@/redux/slices/getExpense.js";
import { useEffect, useState } from "react";
import { fetchMaxData } from "@/redux/slices/getMaxExpense";
import {
  setExpenseData,
} from "@/redux/slices/filterExpense";
import { setMaxExpenseData } from "@/redux/slices/filterMaxExpense";

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
      dispatch(setExpenseData(formData));
      dispatch(setMaxExpenseData(maxFormData));
      setLoading(false);
    }
  }, [formData, maxFormData, dispatch]);

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
