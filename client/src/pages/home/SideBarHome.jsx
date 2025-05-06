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
      <div className="bg-greyBlack flex w-1/4 flex-col justify-center gap-12 px-10 py-4 text-white">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex flex-col gap-6">
              <SideBar
                sidebar_title={"How much you spent ?"}
                sidebar_for={PATH.expense}
                incomingData={entriesExpense}
                totalSum={maxExpense}
              />
              <button
                onClick={() => navigate(PATH.addExpense)}
                className="bg-expense w-full rounded-md px-4 py-1"
              >
                Add Expence
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <SideBar
                sidebar_title={"How much you earned ?"}
                sidebar_for={PATH.income}
                incomingData={entriesIncome}
                totalSum={maxIncome}
              />
              <button
                onClick={() => navigate(PATH.addIncome)}
                className="bg-income w-full rounded-md px-4 py-1"
              >
                Add Expence
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarHome;
