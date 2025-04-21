import SideBar from "@/components/SideBar";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";
import axios from "axios";
import { useEffect, useState } from "react";

const SideBarHome = () => {
  const [entriesExpense, setEntriesExpense] = useState([]); // State to hold fetched data
  const [loadingExpense, setLoadingExpense] = useState(true); // Loading state
  const [errorExpense, setErrorExpense] = useState(null);
  const [maxExpense, setMaxExpense] = useState(0);
  const [entriesIncome, setEntriesIncome] = useState([]); // State to hold fetched data
  const [loadingIncome, setLoadingIncome] = useState(true); // Loading state
  const [errorIncome, setErrorIncome] = useState(null);
  const [maxIncome, setMaxIncome] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/expense/get-expense-prime-max")
      .then((response) => {
        const totalSum = response.data.reduce(
          (sum, item) => sum + item.categoryTotal,
          0,
        );

        setMaxExpense(totalSum);
        const top10entries = response.data
          .sort((a, b) => b.categoryTotal - a.categoryTotal)
          .slice(0, 10);
        setEntriesExpense(top10entries); // Set fetched data to state
        setLoadingExpense(false); // Turn off loading
      })
      .catch((err) => {
        setErrorExpense(err.message); // Handle error
        setLoadingExpense(false); // Turn off loading
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/expense/get-income-prime-max")
      .then((response) => {
        const totalSum = response.data.reduce(
          (sum, item) => sum + item.categoryTotal,
          0,
        );
        setMaxIncome(totalSum);
        const top10entries = response.data
          .sort((a, b) => b.categoryTotal - a.categoryTotal)
          .slice(0, 10);
        setEntriesIncome(top10entries);
        setLoadingIncome(false); // Turn off loading
      })
      .catch((err) => {
        setErrorIncome(err.message); // Handle error
        setLoadingIncome(false); // Turn off loading
      });
  }, []);

  return (
    <>
      <div className="flex h-full w-[30%] flex-col items-center justify-center gap-10 rounded-r-[20px] bg-[#f3f4f6]">
        {loadingExpense && <p>Loading...</p>}
        {errorExpense && <p>Error: {errorExpense}</p>}
        {entriesExpense.length === 0 && !errorExpense && !loadingExpense && (
          <p>Database is Empty</p>
        )}
        {entriesExpense.length > 0 && (
          <>
            <div className="font-pop-m flex w-[70%] flex-col gap-2 text-[15px] text-black"></div>
            <SideBar
              sidebar_title={"How much you spent ?"}
              sidebar_for={PATH.expense}
              incomingData={entriesExpense}
              totalSum={maxExpense}
            />
          </>
        )}

        {loadingIncome && <p>Loading...</p>}
        {errorIncome && <p>Error: {errorIncome}</p>}
        {entriesIncome.length === 0 && !errorIncome && !loadingIncome && (
          <p>Database is Empty</p>
        )}
        {entriesIncome.length > 0 && (
          <>
            <SideBar
              sidebar_title={"How much you earned ?"}
              sidebar_for={PATH.income}
              incomingData={entriesIncome}
              totalSum={maxIncome}
            />
          </>
        )}

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
      </div>
    </>
  );
};

export default SideBarHome;
