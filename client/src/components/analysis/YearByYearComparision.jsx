import { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import YearByYearLineChart from "./YearByYearLineChart";
import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

const YearByYearComparision = ({ isExpense }) => {
  const [loading] = useState(false);
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-row">
              <OuterBar>
                <SelectCard isExpense={isExpense} title={"Compare Year"}>
                  <SelectFilter
                    placeHolder={"Select Year"}
                    items={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  ></SelectFilter>
                </SelectCard>
                <SelectCard isExpense={isExpense} title={"By Year"}>
                  <SelectFilter
                    placeHolder={"Select Year"}
                    items={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  ></SelectFilter>
                </SelectCard>
              </OuterBar>
            </div>
            <div className="flex flex-col gap-2 py-10">
              <div className="flex flex-row items-center gap-2">
                <span> Expense 2025 </span>
                <div className="flex items-center">
                  <FaIndianRupeeSign />
                  <span>Amount Here</span>
                </div>
              </div>
              <div className="flex flex-row">
                you have spent X% more or less compare to last year
              </div>
            </div>
            <div className="flex flex-row gap-5 pb-5">
              <div className="flex flex-1/4 flex-row">
                <YearByYearLineChart></YearByYearLineChart>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex">
                  <h2>Expense Comparision Breakdown by Month</h2>
                </div>
                <div className="flex">
                  <h2>Compared To Year 2024 you have spend</h2>
                </div>
                <div className="flex flex-col gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                    <div className="flex items-center gap-2">
                      <span className="size-4 rounded-xs bg-amber-300"></span>
                      <h6 className="flex flex-row gap-2">
                        <span> In May : </span>
                        <div className="flex items-center gap-1">
                          <span>+/-</span>
                          <FaIndianRupeeSign />
                          <span>235</span>
                          <span>more or less</span>
                        </div>
                      </h6>
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

export default YearByYearComparision;
