import SideBar from "@/components/SideBar";
import { PATH } from "@/router/routerConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarIncome = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const [maxIncome, setMaxIncome] = useState(0);
  const navigate = useNavigate();
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
        setEntries(top10entries);
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
              sidebar_title={"How much you earned ?"}
              sidebar_for={PATH.income}
              incomingData={entries}
              totalSum={maxIncome}
            />
          </>
        )}

        <div className="inline-flex w-[70%]">
          <button
            onClick={() => navigate(PATH.addIncome)}
            className="bg-income w-full rounded-md px-4 py-1 text-[white]"
          >
            Add Income
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarIncome;
