import SideBar from "@/components/SideBar";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";

import { useEffect, useState } from "react";
import {
  filterMaxExpensePrime,
  filterMaxIncomePrime,
} from "@/redux/slices/filterMaxExpense";
import { useDispatch, useSelector } from "react-redux";

const SideBarHome = () => {
  const [entriesExpense, setEntriesExpense] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxExpense, setMaxExpense] = useState(0);
  const [entriesIncome, setEntriesIncome] = useState([]); // State to hold fetched data // Loading state
  const [maxIncome, setMaxIncome] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const incomeData = useSelector(
    (state) => state.filterMaxExpense.maxIncomePrime,
  );
  const expenseData = useSelector(
    (state) => state.filterMaxExpense.maxExpensePrime,
  );

  useEffect(() => {
    dispatch(filterMaxIncomePrime());
    dispatch(filterMaxExpensePrime());
  }, [dispatch]);

  useEffect(() => {
    if (incomeData !== null && expenseData !== null) {
      const totalSumExpense = expenseData.reduce(
        (sum, item) => sum + item.categoryTotal,
        0,
      );
      const totalSumIncome = incomeData.reduce(
        (sum, item) => sum + item.categoryTotal,
        0,
      );
      setMaxIncome(totalSumIncome);
      setMaxExpense(totalSumExpense);
      setEntriesIncome(incomeData);
      setEntriesExpense(expenseData);
      setLoading(false);
    }
  }, [incomeData, expenseData]);

  return (
    <>
      <div className="flex h-full w-[30%] flex-col items-center justify-center gap-10 rounded-r-[20px] bg-[#f3f4f6]">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="font-pop-m flex w-[70%] flex-col gap-2 text-[15px] text-black"></div>
            <SideBar
              sidebar_title={"How much you spent ?"}
              sidebar_for={PATH.expense}
              incomingData={entriesExpense}
              totalSum={maxExpense}
            />
            <SideBar
              sidebar_title={"How much you earned ?"}
              sidebar_for={PATH.income}
              incomingData={entriesIncome}
              totalSum={maxIncome}
            />
            <div className="inline-flex justify-center gap-5">
              <button
                onClick={() => navigate(PATH.addExpense)}
                className="bg-travel rounded-md px-4 py-1 text-[white]"
              >
                Add Expence
              </button>
              <button
                onClick={() => navigate(PATH.addIncome)}
                className="bg-income rounded-md px-4 py-1 text-[white]"
              >
                Add Income
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarHome;
