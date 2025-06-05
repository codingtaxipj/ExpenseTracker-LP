import SubCategoryBarChart from "./SubCategoryBarChart";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import OuterBar from "@/components/selectFilter/OuterBar";
import SelectCard from "@/components/selectFilter/SelectCard";

import { geSubOfPrime, getPrimeCategoriesExpense } from "@/global/categories";
import { useState } from "react";
import moment from "moment";

const SubCategoryMonthlyAnalysis = ({ totalData }) => {
  const categories = { prime: {}, sub: {} };
  categories.prime = getPrimeCategoriesExpense();

  const [filter, setFilter] = useState({
    byYear: String(moment().year()),
    byMonth: String(moment().month()),
    byPrime: categories.prime[0],
  });

  const Years = Object.keys(totalData);
  const Months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const handleYearSelector = (val) => {
    console.log("Year is", typeof val);
    setFilter((prev) => ({ ...prev, byYear: val }));
  };
  const handleMonthSelector = (val) => {
    setFilter((prev) => ({ ...prev, byMonth: val }));
  };
  const handlePrimeSelector = (val) => {
    setFilter((prev) => ({ ...prev, byPrime: val }));
  };
  categories.sub = geSubOfPrime(filter.byPrime, true);

  return (
    <>
      <>
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-1 flex-row pb-5">
            <OuterBar>
              <SelectCard isExpense={true} title={"Show Sub Categories of"}>
                <SelectFilter
                  placeholder={"Select Prime Category"}
                  onValueChange={handlePrimeSelector}
                  defaultValue={filter.byPrime}
                  list={categories.prime}
                ></SelectFilter>
              </SelectCard>
              <SelectCard isExpense={true} title={"By Year"}>
                <SelectFilter
                  placeholder={"Select Year"}
                  onValueChange={handleYearSelector}
                  defaultValue={filter.byYear}
                  list={Years}
                ></SelectFilter>
              </SelectCard>
              <SelectCard isExpense={true} title={"In Month Of"}>
                <SelectFilter
                  placeholder={"Select Month"}
                  onValueChange={handleMonthSelector}
                  isMonthSelect={true}
                  defaultValue={filter.byMonth}
                  list={Months}
                ></SelectFilter>
              </SelectCard>
            </OuterBar>
          </div>
          <div className="flex flex-row">
            <SubCategoryBarChart
              list={categories.sub}
              year={filter.byYear}
              month={filter.byMonth}
            ></SubCategoryBarChart>
          </div>
        </div>
      </>
    </>
  );
};

export default SubCategoryMonthlyAnalysis;
