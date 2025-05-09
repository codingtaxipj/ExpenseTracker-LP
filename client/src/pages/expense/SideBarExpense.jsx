import SideBar from "@/components/SideBar";
import useInitalReduxLoad from "@/components/useInitalReduxLoad";
import { PATH } from "@/router/routerConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarExpense = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxExpense, setMaxExpense] = useState(0);
  const { expenseMaxData } = useInitalReduxLoad({
    isExpenseMaxData: true,
    isPrimeCategory: true,
  });
  useEffect(() => {
    if (expenseMaxData) {
      setEntries(expenseMaxData);
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
      <div className="bg-greyBlack flex w-1/4 flex-col justify-center gap-6 px-10 py-4 text-white">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <SideBar
              sidebar_title={"How much you spent ?"}
              sidebar_for={PATH.expense}
              incomingData={entries}
              totalSum={maxExpense}
            />
          </>
        )}
        <div>
          <button
            onClick={() => navigate(PATH.addExpense)}
            className="bg-travel w-full rounded-md px-4 py-1"
          >
            Add Expence
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarExpense;
