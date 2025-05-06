import { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import TotalCard from "@/components/TotalCard";
import { CheckAnalysisCard } from "@/components/ButtonCard";
import TableSection from "@/components/TableSection";
import { useSelector } from "react-redux";

const ExpenseIndex = () => {
  const [loading, setLoading] = useState(true); // Loading state

  const [entries, setEntries] = useState([]); // State to hold fetched data
  const data = useSelector((state) => state.configExpense.dataExpense);

  useEffect(() => {
    if (data !== null) {
      setEntries(data);
      setLoading(false);
    }
  }, [data, setLoading]);
  return (
    <>
      <div className="[&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover max-h-screen w-3/4 overflow-y-auto rounded-md p-10 text-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex gap-5">
              <TotalCard cardFor="year" />
              <TotalCard cardFor="month" />
              <TotalCard cardFor="year" />
              <CheckAnalysisCard />
            </div>
            <div className="pt-6 pb-2">
              <div className="flex py-2.75">
                <div className="flex items-center gap-2 pl-0.5 text-base font-medium">
                  <FaListUl />
                  Expense Entries
                </div>
              </div>
            </div>
            <TableSection entries={entries} />
          </>
        )}
      </div>
    </>
  );
};

export default ExpenseIndex;
