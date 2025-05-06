import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import TotalCard from "@/components/TotalCard";
import TableSection from "@/components/TableSection";
import { FaListUl } from "react-icons/fa";
import { CheckAnalysisCard } from "@/components/ButtonCard";

const IncomeIndex = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state

  const data = useSelector((state) => state.configExpense.dataIncome);

  useEffect(() => {
    if (data !== null) {
      setEntries(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div className="[&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover max-h-screen w-3/4 overflow-y-auto rounded-md p-10 text-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex gap-5">
              <TotalCard isExpense={false} cardFor="year" />
              <TotalCard isExpense={false} cardFor="month" />
              <TotalCard isExpense={false} cardFor="year" />
              <CheckAnalysisCard isExpense={false} />
            </div>
            <div className="pt-6 pb-2">
              <div className="flex py-2.75">
                <div className="flex items-center gap-2 pl-0.5 text-base font-medium">
                  <FaListUl />
                  Income Entries
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

export default IncomeIndex;
