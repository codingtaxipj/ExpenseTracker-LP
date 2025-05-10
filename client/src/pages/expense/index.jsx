import { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import TotalCard from "@/components/TotalCard";
import { CheckAnalysisCard } from "@/components/ButtonCard";
import TableSection from "@/components/TableSection";
import useInitalReduxLoad from "@/components/useInitalReduxLoad.js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExpenseIndex = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const { expenseData } = useInitalReduxLoad({ isExpenseData: true });
  useEffect(() => {
    if (expenseData) {
      setEntries(expenseData);
      setLoading(false);
    }
  }, [expenseData]);
  return (
    <>
      <div className="bg-darkBlack w-full overflow-y-auto p-10 [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
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
                <div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
