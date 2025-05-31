import { useEffect, useState } from "react";
import TotalCard from "@/components/TotalCard";
import TableSection from "@/components/TableSection";
import { CheckAnalysisCard } from "@/components/ButtonCard";
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
import { calander } from "@/global/globalVariables";

const IncomeIndex = () => {
  const isExpense = false;
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const { incomeData } = useInitalReduxLoad({ isExpenseData: isExpense });

  useEffect(() => {
    if (incomeData) {
      setEntries(incomeData);
      setLoading(false);
    }
  }, [incomeData]);

  useCalculate(entries, isExpense);

  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex gap-5 pt-6">
              <TotalCard isExpense={false} cardFor={calander.year} />
              <TotalCard isExpense={false} cardFor={calander.month} />

              <CheckAnalysisCard isExpense={false} />
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
              <BarChartSection isExpense={false} entries={entries} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IncomeIndex;
