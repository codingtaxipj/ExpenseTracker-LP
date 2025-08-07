import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import DoubleLineChart from "../charts/DoubleLineChart";

import TotalCard from "../cards/TotalCard";
import YearCompareCard from "./YearCompareCard";
import InfoStrip from "../strips/info-strip";
import MinMaxStrip from "../strips/min-max-strip";
import BudgetStrip from "../strips/budget-strip";
import BudgetMonth from "./BudgetMonth";

import SectionTitle from "../section/section-title";
import useTotalConfig from "@/hooks/useTotalConfig";
import { CurrentYear, getMonthName } from "@/utilities/calander-utility";
import { useState } from "react";
import { GraphTitleSquare } from "./Single-Year-Graph";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";
import { amountFloat } from "../utilityFilter";
import { Icons } from "../icons";
import HorizontalDivider from "../strips/horizontal-divider";
import { getBudgetExpPercent } from "@/hooks/useBudgetConfig";
import FlexrowStrip from "../strips/flexrow-strip";

const YearComparisionGraph = ({ isExpense }) => {
  const {
    TotalByMonth_EXP,
    TotalByMonth_INC,
    TotalByYear_EXP,
    TotalByYear_INC,
    YearsList,
    getMonthListOfYear,
    getTotalOfYear,
  } = useTotalConfig();
  //NOTE - monthdata will be assign based on graph using for expense or income
  const MonthData = isExpense ? TotalByMonth_EXP : TotalByMonth_INC;

  //NOTE - Total Expense or Income in year
  const YearExpenseData = isExpense ? TotalByYear_EXP : TotalByYear_INC;
  const [year1, setYear1] = useState(CurrentYear());
  const [year2, setYear2] = useState(CurrentYear());

  const TotalExpenseYear1 = getTotalOfYear(YearExpenseData, year1);
  const TotalExpenseYear2 = getTotalOfYear(YearExpenseData, year2);

  const diff = TotalExpenseYear1 - TotalExpenseYear2;
  const per = getBudgetExpPercent(TotalExpenseYear2, TotalExpenseYear1);

  //NOTE - sets the year to get the months data
  const handleYearSelector1 = (year1) => setYear1(Number(year1));
  const handleYearSelector2 = (year2) => setYear2(Number(year2));

  //NOTE - chart data for graph
  const chartData = [
    ...(() => {
      const arr = [];
      for (let i = 0; i < 12; i++) {
        const m1 = getMonthListOfYear(MonthData, year1).find(
          (m) => m.month === i,
        );
        const m2 = getMonthListOfYear(MonthData, year2).find(
          (m) => m.month === i,
        );
        arr.push({
          month: getMonthName(i, "MMMM"),
          [year1]: m1?.total ?? 0,
          [year2]: m2?.total ?? 0,
        });
      }
      return arr;
    })(),
  ];

  const barInfo = {
    data: chartData,
    lableOne: String(year1),
    labelTwo: String(year2),
  };

  const chartInfo = {
    title: (
      <>
        <Flexcol className="gap-2.5">
          <Flexrow className="gap-2">
            <span>Double Line Graph - </span>
            <GraphTitleSquare className={"bg-year1"} />
            {year1}
            <GraphTitleSquare className={"bg-year2"} />
            {year2}
          </Flexrow>
          <Flexrow className="text-16 w-max items-center gap-1.25">
            <span className="text-14">
              <Icons.checkCircle className="text-year1" />
            </span>
            <span>Total {isExpense ? "Expense" : "Income"}</span>
            <HorizontalDivider className="bg-white" />
            Rs.
            <span className="text-year1">{amountFloat(TotalExpenseYear1)}</span>
          </Flexrow>

          <Flexrow className="text-16 w-max items-center gap-1.25">
            <span className="text-14">
              <Icons.checkCircle className="text-year2" />
            </span>
            <span>Total {isExpense ? "Expense" : "Income"}</span>
            <HorizontalDivider className="bg-white" />
            Rs.
            <span className="text-year2">{amountFloat(TotalExpenseYear2)}</span>
          </Flexrow>
        </Flexcol>
      </>
    ),
    subtext: `Graph Comparing ${isExpense ? "Expenses" : "Income"} in Year by Month`,
    footertext: `Comparing Total ${isExpense ? "Expense" : "Income"} of Each Month in a Year `,
  };

  return (
    <>
      <Flexcol>
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense={isExpense} title={"Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector1}
                defaultValue={String(year1)}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
            <SelectCard noIcon isExpense={isExpense} title={"Compare To Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector2}
                defaultValue={String(year1)}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>
        <Flexrow>
          <DoubleLineChart
            barInfo={barInfo}
            chartInfo={chartInfo}
          ></DoubleLineChart>
        </Flexrow>
        {year1 !== year2 && (
          <>
            <FlexrowStrip className="text-14 gap-1.25">
              <span>In {year1} </span>
              <span>Compared to {year2} </span>
              <HorizontalDivider className="bg-white" />
              <span className="text-14">
                <Icons.checkCircle
                  className={`${isExpense ? "text-exp" : "text-inc"}`}
                />
              </span>
              <span> You are </span>
              <span>
                {diff < 0 && (isExpense ? "Spent less" : "Earned Less")}
                {diff > 0 && (isExpense ? "Spent More" : "Earned More")}
                {diff == 0 && "Break Even"}
              </span>
              <HorizontalDivider className="bg-white" />
              <span className="text-12">
                <Icons.rupee />
              </span>
              <span
                className={`${diff < 0 && (isExpense ? "text-gg" : "text-rr")} ${diff > 0 && (isExpense ? "text-rr" : "text-gg")} ${diff == 0 && "text-budget"}`}
              >
                {amountFloat(diff)}
              </span>
              <HorizontalDivider className="bg-white" />
              i.e
              <span
                className={` ${per > 0 && (isExpense ? "text-rr" : "text-gg")} ${per < 0 && (isExpense ? "text-gg" : "text-rr")} ${per == 0 && "text-budget"}`}
              >
                {per} %
              </span>
              <span className="text-12">
                {per > 0 && (
                  <Icons.graphup
                    className={`${isExpense ? "text-rr" : "text-gg"}`}
                  />
                )}
                {per < 0 && (
                  <Icons.graphdown
                    className={`${isExpense ? "text-gg" : "text-rr"}`}
                  />
                )}
              </span>
            </FlexrowStrip>
          </>
        )}
      </Flexcol>
    </>
  );
  /*  const { filter, Years, handleYearSelector, compareToYearSelector, totalBy } =
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
      <div className="flex w-full flex-col gap-5 px-10 pb-30">
        <SectionTitle title="Compare Expenses By Year" isAnalysis />
        <div className="flex flex-row">
          <SelectBar>
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
          </SelectBar>
        </div>
        <div className="flex flex-row gap-5 pb-10">
          <div className="flex flex-1 flex-row">
            <DoubleLineChart
              barInfo={{
                data: chartData,
                lableOne: String(filter.byYear),
                labelTwo: String(filter.toYear),
              }}
              chartInfo={{
                title: `Double Line Graph - `,
                subtext: `${isExpense ? "Expenses" : "Income"} Comparision in Years by Months`,
                footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Years`,
              }}
            ></DoubleLineChart>
          </div>
          <div className="flex flex-col justify-center gap-3 py-2">
            <TotalCard
              isExpense
              color="text-year1"
              headText="Expense"
              total={2025}
              footerText={"Your Total Spending in Year"}
              date={2025}
            ></TotalCard>
            <MinMaxStrip isMax />
            <MinMaxStrip isMin />
            <TotalCard
              isExpense
              headText="Expense"
              color="text-year2"
              total={2025}
              footerText={"Your Total Spending in Year"}
              date={2025}
            ></TotalCard>
            <MinMaxStrip isMax />
            <MinMaxStrip isMin />
            <YearCompareCard
              isExpense
              compareIn={filter.byYear}
              compareTo={filter.toYear}
              percent={20}
              date={filter.toYear}
            ></YearCompareCard>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span className="text-year1 shadow-shadowBlack bg-gradBot text-14 flex h-7 items-center rounded-md px-2 font-medium shadow-md">
              2025
            </span>
            <BudgetStrip amount={20000} color="text-year1" />
            <BudgetMonth isOver />
            <BudgetMonth isUnder />
          </div>
          <div className="flex flex-wrap gap-5 pb-10">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <InfoStrip isExpense key={item} color="bg-year1" amount={-20} />
            ))}
          </div>
          <div className="flex gap-5">
            <span className="text-year2 shadow-shadowBlack bg-gradBot text-14 flex h-7 items-center rounded-md px-2 font-medium shadow-md">
              2025
            </span>
            <BudgetStrip amount={20000} color="text-year2" />
            <BudgetMonth isOver />
            <BudgetMonth isUnder />
          </div>
          <div className="flex flex-wrap gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <InfoStrip isIncome key={item} color="bg-year2" amount={20} />
            ))}
          </div>
        </div>
      </div>
    </>
  ); */
};

export default YearComparisionGraph;
