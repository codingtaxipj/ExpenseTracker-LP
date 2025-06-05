import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrimeCategoryPieChart from "./PrimeCategoryPieChart";
import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

const PrimeCategoryYearlyAnalysis = ({ isExpense }) => {
  const [loading] = useState(false);
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="flex flex-1 flex-col gap-5 p-5">
            <div className="flex flex-row pb-5">
              <OuterBar>
                <SelectCard isExpense={isExpense} title={"Analysis of Year"}>
                  <SelectFilter
                    list={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  ></SelectFilter>
                </SelectCard>
              </OuterBar>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-1/2">
                <PrimeCategoryPieChart></PrimeCategoryPieChart>
              </div>
              <div className="flex flex-1/2 flex-col">
                <div className="flex">
                  <h2>Year 2025 </h2>
                </div>
                <div className="flex pb-5">
                  <h2>Expense Breakdown by Prime Category</h2>
                </div>
                <div className="flex flex-col gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                    <div className="flex items-center gap-2">
                      <span className="size-4 rounded-xs bg-amber-300"></span>
                      <h6>Month Title</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PrimeCategoryYearlyAnalysis;
