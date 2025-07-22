import { useEffect, useState } from "react";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import useAnalysisConfig from "./useAnalysisConfig";
import SingleBarChart from "../charts/SingleBarChart";
import moment from "moment";
import MinMaxStrip from "../strips/min-max-strip";
import Flexrow from "../section/flexrow";
import Flexcol from "../section/flexcol";

const ExpenseByYearGraph = ({ isExpense }) => {
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
      <Flexcol>
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense={isExpense} title={"Data of Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={filter.byYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>

        <Flexrow>
          <MinMaxStrip isExpense isMax />
          <MinMaxStrip isExpense isMin />
        </Flexrow>
        <Flexrow>
          <SingleBarChart
            isExpense
            barInfo={{
              data: chartData,
              label: "Expense",
            }}
            chartInfo={{
              title: `Bar Graph - ${filter.byYear}`,
              subtext: `${isExpense ? "Expenses" : "Income"} in Year by Months`,
              footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Year`,
            }}
          ></SingleBarChart>
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default ExpenseByYearGraph;
