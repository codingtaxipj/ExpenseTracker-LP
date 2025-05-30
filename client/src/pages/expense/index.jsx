import { useEffect, useState } from "react";
import TotalCard from "@/components/TotalCard";
import { CheckAnalysisCard } from "@/components/ButtonCard";
import TableSection from "@/components/TableSection";
import useInitalReduxLoad from "@/components/useInitalReduxLoad.js";
import BarChartSection from "@/components/BarChartSection";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCalculate from "@/components/useCalculate";

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

  useCalculate(entries);

  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex gap-5 pt-6">
              <TotalCard isExpense={true} cardFor="year" entries={entries} />
              <TotalCard isExpense={true} cardFor="month" entries={entries} />
              <TotalCard isExpense={true} cardFor="week" entries={entries} />
              <CheckAnalysisCard />
            </div>
            <div className="mt-6 py-4">
              <div className="bg-grey-hover flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
                <div>
                  <span className="h-7 rounded-md px-2 text-sm">
                    Filter Table
                  </span>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                      <SelectValue placeholder="Sort By Type" />
                    </SelectTrigger>
                    <SelectContent className="w-40">
                      <SelectItem value="subCat">Category</SelectItem>
                      <SelectItem value="primeCat">Category From</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                      <SelectValue placeholder="Sort By Value" />
                    </SelectTrigger>
                    <SelectContent className="w-40">
                      <SelectItem value="subCat">Category</SelectItem>
                      <SelectItem value="primeCat">Category From</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <TableSection entries={entries} />
            <div className="pt-6">
              <BarChartSection isExpense={true} entries={entries} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExpenseIndex;
