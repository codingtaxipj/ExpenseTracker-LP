import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";

import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import DoubleLineChart from "../charts/DoubleLineChart";
import useAnalysisConfig from "./useAnalysisConfig";
import moment from "moment";

import { useEffect, useState } from "react";
import { getPercent } from "../utilityCalculate";

import TotalCard from "./TotalCard";
import YearCompareCard from "./YearCompareCard";
import InfoStrip from "./InfoStrip";

const YearByYearComparision = ({ isExpense }) => {
  const { filter, Years, handleYearSelector, compareToYearSelector, totalBy } =
    useAnalysisConfig(isExpense);

  const [chartData, setChartData] = useState({
    Month: "",
    [filter.byYear]: "",
    [filter.toYear]: "",
  });

  useEffect(() => {
    if (Object.keys(totalBy.month).length > 0) {
      const list = totalBy.month[filter.byYear];
      const list2 = totalBy.month[filter.toYear];
      const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => ({
        month: moment().month(item).format("MMMM"),
        [String(filter.byYear)]: list[item]?.total || 0,
        [String(filter.toYear)]: list2[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, totalBy.month, filter.toYear]);

  const percent = getPercent(
    totalBy.year[filter.toYear]?.total,
    totalBy.year[filter.byYear]?.total,
  );

  return (
    <>
      <div className="flex w-full flex-col gap-5 p-5">
        <div className="flex flex-row">
          <OuterBar>
            <SelectCard isExpense={isExpense} title={"Compare Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={filter.byYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
            <SelectCard isExpense={isExpense} title={"To Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={compareToYearSelector}
                defaultValue={filter.toYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
          </OuterBar>
        </div>
        <div className="flex flex-row gap-5 pb-5">
          <div className="flex flex-1 flex-row">
            <DoubleLineChart
              barInfo={{
                data: chartData,
                lableOne: String(filter.byYear),
                labelTwo: String(filter.toYear),
              }}
              chartInfo={{
                title: `Double Line Graph of Years `,
                subtext: `${isExpense ? "Expenses" : "Income"} Comparision in Years by Months`,
                footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Years`,
              }}
            ></DoubleLineChart>
          </div>
          <div className="flex flex-col justify-center gap-3 py-2">
            <TotalCard
              isExpense
              color={"var(--color-yearBy)"}
              total={2025}
              footerText={"In 12 Months"}
              date={2025}
            ></TotalCard>
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
            <TotalCard
              isExpense
              color={"var(--color-yearBy)"}
              total={2025}
              footerText={"In 12 Months"}
              date={2025}
            ></TotalCard>
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
            <YearCompareCard
              isExpense
              compareIn={filter.byYear}
              compareTo={filter.toYear}
              percent={percent}
              date={filter.toYear}
            ></YearCompareCard>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span>THE Budget 2024</span>
            <InfoStrip></InfoStrip>
            <span>Over Budget</span>5<span>Under Budget</span>7
          </div>
          <div className="flex gap-5">
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
          </div>
          <div className="flex gap-5">
            <span>THE Budget 2024</span>
            <InfoStrip></InfoStrip>
            <span>Over Budget</span>5<span>Under Budget</span>7
          </div>
          <div className="flex gap-5">
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
            <InfoStrip></InfoStrip>
          </div>
        </div>
      </div>
    </>
  );
};

export default YearByYearComparision;
