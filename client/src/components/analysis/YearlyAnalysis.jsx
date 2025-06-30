import { useEffect, useState } from "react";
import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import useAnalysisConfig from "./useAnalysisConfig";
import SingleBarChart from "../charts/SingleBarChart";
import moment from "moment";
import BudgetStrip from "./BudgetStrip";
import MinMaxStrip from "./MinMaxStrip";
import SectionHeader from "../section-header";
import SectionOuterFlexcol from "./section-outer-flexcol";

import Flexrow from "../flexrow";

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
      <SectionOuterFlexcol>
        <SectionHeader title="Expense Analysis By Year" isAnalysis />
        <Flexrow>
          <OuterBar>
            <SelectCard isExpense={isExpense} title={"Data of Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={filter.byYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
          </OuterBar>
        </Flexrow>
        <Flexrow>
          <BudgetStrip
            isExpense
            amount={20000}
            color={isExpense ? "text-exp" : "text-inc"}
          />
          <MinMaxStrip isMax />
          <MinMaxStrip isMin />
        </Flexrow>
        <Flexrow>
          <SingleBarChart
            barInfo={{
              data: chartData,
              label: "Expense",
              color: isExpense ? "var(--color-exp)" : "var(--color-inc)",
            }}
            chartInfo={{
              title: `Bar Graph - ${filter.byYear}`,
              subtext: `${isExpense ? "Expenses" : "Income"} in Year by Months`,
              footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Year`,
            }}
          ></SingleBarChart>
        </Flexrow>
      </SectionOuterFlexcol>
    </>
  );
};

export default YearlyAnalysis;
