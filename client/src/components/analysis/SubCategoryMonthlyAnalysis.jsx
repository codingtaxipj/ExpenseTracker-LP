import SubCategoryBarChart from "./SubCategoryBarChart";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import OuterBar from "@/components/selectFilter/OuterBar";
import SelectCard from "@/components/selectFilter/SelectCard";

import { useEffect, useState } from "react";
import useAnalysisConfig from "./useAnalysisConfig";
import SingleBarChart from "../charts/SingleBarChart";


const SubCategoryMonthlyAnalysis = () => {
  const {
    filter,
    categories,
    Years,
    Months,
    handleYearSelector,
    handleMonthSelector,
    handlePrimeSelector,
    expense,
  } = useAnalysisConfig();

  const [chartData, setChartData] = useState({
    Title: [],
    Amount: 0,
  });

  useEffect(() => {
    if (Object.keys(expense.sub).length > 0) {
      const list = expense.sub[filter.byYear]?.[filter.byMonth];
      if (!list) return;

      const data = categories.sub.map((item) => ({
        Title: item,
        Amount: list?.[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [expense.sub, filter.byYear, filter.byMonth, categories.sub]);

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
            <SingleBarChart
            
              barInfo={{
                data: chartData,
                label: "Sub Category",
                color: "var(--color-expense)",
              }}
            ></SingleBarChart>
          </div>
        </div>
      </>
    </>
  );
};

export default SubCategoryMonthlyAnalysis;
