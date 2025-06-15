import { useEffect, useState } from "react";

import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import useAnalysisConfig from "./useAnalysisConfig";

import InfoStrip from "./InfoStrip";
import SingleBarChart from "../charts/SingleBarChart";
import moment from "moment";

const YearlyAnalysis = ({ isExpense }) => {
  const { filter, Years, handleYearSelector, totalBy } =
    useAnalysisConfig(isExpense);

  const [chartData, setChartData] = useState({
    Title: [],
    Amount: 0,
  });

  useEffect(() => {
    if (Object.keys(totalBy.month).length > 0) {
      const list = totalBy.month[filter.byYear];

      const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => ({
        Title: moment().month(item).format("MMM"),
        Amount: list[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, totalBy.month]);

  return (
    <>
      <div className="flex w-full flex-col gap-5 p-5">
        <div className="flex flex-row">
          <OuterBar>
            <SelectCard isExpense={isExpense} title={"By Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={filter.byYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
          </OuterBar>
        </div>
        <div className="flex w-full flex-row gap-5">
          <span>THE Budget</span>
          <InfoStrip></InfoStrip>
          <span>MIN/MAX</span>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
        </div>
        <div className="flex w-full">
          <SingleBarChart
            barInfo={{
              data: chartData,
              label: "Expense",
              color: "var(--color-expense)",
            }}
            chartInfo={{
              title: `Bar Graph - ${filter.byYear}`,
              subtext: `${isExpense ? "Expenses" : "Income"} in Year by Months`,
              footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Year`,
            }}
          ></SingleBarChart>
        </div>
      </div>
    </>
  );
};

export default YearlyAnalysis;
