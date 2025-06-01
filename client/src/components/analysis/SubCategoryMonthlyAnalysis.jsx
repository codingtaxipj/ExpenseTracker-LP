import { useState } from "react";
import SubCategoryBarChart from "./SubCategoryBarChart";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import OuterBar from "@/components/selectFilter/OuterBar";
import SelectCard from "@/components/selectFilter/SelectCard";

const SubCategoryMonthlyAnalysis = ({ isExpense }) => {
  const [loading] = useState(false);
  const jj = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="flex flex-1 flex-col gap-5 p-5">
            <div className="flex flex-1 flex-row pb-5">
              <OuterBar>
                <SelectCard isExpense={isExpense} title={"Show Sub Categories of"}>
                  <SelectFilter
                    placeHolder={"Prime Category"}
                    items={jj}
                  ></SelectFilter>
                </SelectCard>
                <SelectCard isExpense={isExpense} title={"By Year"}>
                  <SelectFilter
                    placeHolder={"Select Year"}
                    items={jj}
                  ></SelectFilter>
                </SelectCard>
                <SelectCard isExpense={isExpense} title={"In Month Of"}>
                  <SelectFilter
                    placeHolder={"Select Month"}
                    items={jj}
                  ></SelectFilter>
                </SelectCard>
              </OuterBar>
            </div>
            <div className="flex flex-row">
              <SubCategoryBarChart></SubCategoryBarChart>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SubCategoryMonthlyAnalysis;
