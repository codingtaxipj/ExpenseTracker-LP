import SideBar from "../SideBar";
import { navVars } from "../../global/global-variables";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const SideBarExpense = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const [maxExpense, setMaxExpense] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/get-expense-category-totalspend")
      .then((response) => {
        const totalSum = response.data.reduce(
          (sum, item) => sum + item.totalExpenseAmount,
          0,
        );

        setMaxExpense(totalSum);
        const top10entries = response.data
          .sort((a, b) => b.totalExpenseAmount - a.totalExpenseAmount)
          .slice(0, 10);
        setEntries(top10entries); // Set fetched data to state
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        setError(err.message); // Handle error
        setLoading(false); // Turn off loading
      });
  }, []);

  return (
    <>
      <div className="flex h-full w-[30%] flex-col items-center justify-center gap-10 rounded-r-[20px] bg-[#f3f4f6]">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {entries.length === 0 && !error && !loading && <p>Database is Empty</p>}
        {entries.length > 0 && (
          <>
            <SideBar
              sidebar_title={"How much you spent ?"}
              sidebar_for={navVars.EXPENSE}
              incomingData={entries}
              totalSum={maxExpense}
            />
          </>
        )}
        <div className="inline-flex w-[70%]">
          <button
            onClick={() => navigate(navVars.ADD_EXPENSE)}
            className="w-full rounded-md bg-travel px-4 py-1 text-[white]"
          >
            Add Expence
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarExpense;
