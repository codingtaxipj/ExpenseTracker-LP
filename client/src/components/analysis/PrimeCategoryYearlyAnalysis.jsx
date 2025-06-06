import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import SimplePieChart from "../charts/SimplePieChart";
import useAnalysisConfig from "./useAnalysisConfig";
import { useEffect, useState } from "react";
import moment from "moment";

const PrimeCategoryYearlyAnalysis = () => {
  const { filter, Years, handleYearSelector, expense, colorPalette } =
    useAnalysisConfig();

  const [chartData, setChartData] = useState({
    Title: [],
    Amount: 0,
  });

  useEffect(() => {
    if (Object.keys(expense.month).length > 0) {
      const list = expense.month[filter.byYear];
      if (!list) return;

      const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => ({
        Title: item,
        Amount: list?.[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, expense.month]);

  return (
    <>
      <>
        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-row pb-5">
            <OuterBar>
              <SelectCard isExpense={true} title={"By Year"}>
                <SelectFilter
                  placeholder={"Select Year"}
                  onValueChange={handleYearSelector}
                  defaultValue={filter.byYear}
                  list={Years}
                ></SelectFilter>
              </SelectCard>
            </OuterBar>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-1/2">
              <SimplePieChart
                colorPalette={colorPalette}
                barInfo={chartData}
              ></SimplePieChart>
            </div>
            <div className="flex flex-1/2 flex-col">
              <div className="flex">
                <h2>Year {filter.byYear} </h2>
              </div>
              <div className="flex pb-5">
                <h2>Expense Breakdown by Prime Category</h2>
              </div>
              <div className="flex flex-col gap-1">
                {Object.values(chartData).map((item, index) => (
                  <div key={item.Title} className="flex items-center gap-2">
                    <span
                      className={`size-4 rounded-xs`}
                      style={{ backgroundColor: colorPalette[index] }}
                    ></span>
                    <h6>
                      {moment().month(String(item.Title)).format("MMMM")}:
                      {item.Amount}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default PrimeCategoryYearlyAnalysis;
