import SideBar from "@/components/SideBar";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";

import { useEffect, useState } from "react";
import useInitalReduxLoad from "@/components/useInitalReduxLoad";

const SideBarHome = () => {
  const navigate = useNavigate();
  const [entriesExpense, setEntriesExpense] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxExpense, setMaxExpense] = useState(0);
  const [entriesIncome, setEntriesIncome] = useState([]); // State to hold fetched data // Loading state
  const [maxIncome, setMaxIncome] = useState(0);

  const { expenseMaxData } = useInitalReduxLoad({
    isExpenseMaxData: true,
    isPrimeCategory: true,
  });

  const { incomeMaxData } = useInitalReduxLoad({
    isExpenseMaxData: false,
    isPrimeCategory: true,
  });
  useEffect(() => {
    if (incomeMaxData) {
      const data = incomeMaxData.slice(0, 8);
      setEntriesIncome(data);
      const totalSum = incomeMaxData.reduce(
        (sum, item) => sum + item.categoryTotal,
        0,
      );
      setMaxIncome(totalSum);
      setLoading(false);
    }
  }, [incomeMaxData]);

  useEffect(() => {
    if (expenseMaxData) {
      const data = expenseMaxData.slice(0, 8);
      setEntriesExpense(data);
      const totalSum = expenseMaxData.reduce(
        (sum, item) => sum + item.categoryTotal,
        0,
      );
      setMaxExpense(totalSum);
      setLoading(false);
    }
  }, [expenseMaxData]);

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
