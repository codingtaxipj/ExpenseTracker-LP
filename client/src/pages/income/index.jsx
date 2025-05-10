import { useEffect, useState } from "react";
import TotalCard from "@/components/TotalCard";
import TableSection from "@/components/TableSection";
import { FaListUl } from "react-icons/fa";
import { CheckAnalysisCard } from "@/components/ButtonCard";
import useInitalReduxLoad from "@/components/useInitalReduxLoad.js";

const IncomeIndex = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const { incomeData } = useInitalReduxLoad({ isExpenseData: false });
  console.log(incomeData);

  useEffect(() => {
    if (incomeData) {
      setEntries(incomeData);
      setLoading(false);
    }
  }, [incomeData]);

  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
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
