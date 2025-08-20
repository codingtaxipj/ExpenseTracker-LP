import { useState } from "react";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import SingleBarChart from "../charts/SingleBarChart";

import Flexrow from "../section/flexrow";
import Flexcol from "../section/flexcol";
import useTotalConfig from "@/hooks/useTotalConfig";
import {
  CurrentMonth,
  CurrentYear,
  getMonthName,
} from "@/utilities/calander-utility";
import { cn } from "@/lib/utils";
import useBudgetConfig, { getBudgetExpPercent } from "@/hooks/useBudgetConfig";

import { Icons } from "../icons";
import FlexrowStrip from "../strips/flexrow-strip";
import HorizontalDivider from "../strips/horizontal-divider";
import TooltipStrip from "../strips/tooltip-strip";
import BudgetPercentStrip from "../strips/budget-percent-strip";
import { amountFloat } from "../utilityFilter";

import TotalCardForYear from "../cards/total-card-for-year";
import TotalBudgetCard from "../cards/total-budget-card";
import BudgetExpenseTable from "../table/budget-expense-table";
import IncomeExpenseTable from "../table/income-expense-table";

const SingleYearGraph = ({ isExpense, isAnalysis }) => {
  /** ============================================================ */

  //NOTE - BUDGET CONFIG
  const {
    getBudgetListOfYear,
    BudgetByMonth,
    createBudgetWithExpense,
    getTotalBudgetOfYear,
  } = useBudgetConfig();

  /** ============================================================ */

  //NOTE - TOTAL CONFIG
  const {
    TotalByMonth_EXP,
    TotalByMonth_INC,
    TotalByYear_EXP,
    TotalByYear_INC,
    YearsList,
    getMonthListOfYear,
    getTotalOfYear,
    createIncomeWithExpense,
  } = useTotalConfig();

  /** ============================================================ */

  //NOTE - year state
  const [year, setYear] = useState(CurrentYear());
  //NOTE - sets the year to get the months data
  const handleYearSelector = (year) => setYear(Number(year));

  /** ============================================================ */

  //NOTE - arry OBJ of each month and expense
  const ExpenseEachMonth = getMonthListOfYear(TotalByMonth_EXP, year);
  const IncomeEachMonth = getMonthListOfYear(TotalByMonth_INC, year);

  //NOTE - arry OBJ of each month and budget by year
  const BudgetEachMonth = getBudgetListOfYear(BudgetByMonth, year);

  //NOTE - arry OBJ {id, month name, expense amount, budget ,its percent }
  const BudgetExpenseCombo = createBudgetWithExpense(
    BudgetEachMonth,
    ExpenseEachMonth,
  );

  const IncomeExpenseCombo = createIncomeWithExpense(
    IncomeEachMonth,
    ExpenseEachMonth,
  );

  /** ============================================================ */
  //NOTE - gets the total budget of year
  const TotalBudgetYear = getTotalBudgetOfYear(BudgetByMonth, year);
  const TotalExpenseYear = getTotalOfYear(TotalByYear_EXP, year);
  const TotalIncomeYear = getTotalOfYear(TotalByYear_INC, year);

  const IE_Difference = TotalIncomeYear - TotalExpenseYear;
  const IE_Percent = getBudgetExpPercent(TotalIncomeYear, TotalExpenseYear);

  const BE_Difference = TotalBudgetYear - TotalExpenseYear;

  const BE_Percent = TotalBudgetYear
    ? getBudgetExpPercent(TotalBudgetYear, TotalExpenseYear)
    : null;

  const diff = isExpense ? BE_Difference : IE_Difference;
  const per = isExpense ? BE_Percent : IE_Percent;

  /** ============================================================ */

  //NOTE - chart data for graph
  const chartData = isExpense
    ? [
        ...BudgetExpenseCombo.map((be) => ({
          month: be.month,
          amount: be.expense,
        })),
      ]
    : [
        ...IncomeExpenseCombo.map((ie) => ({
          month: ie.month,
          amount: ie.income,
        })),
      ];

  const barInfo = {
    data: chartData,
    label: isExpense ? "Expense" : "Income",
    color: isExpense ? "var(--color-exp)" : "var(--color-inc)",
  };

  const chartInfo = {
    title: (
      <>
        <GraphTitleSquare className={isExpense ? "bg-exp" : "bg-inc"} />
        <span className="mr-2.5"> Bar Graph - {year}</span>
        <Flexrow className="text-16px w-max items-center gap-1.25">
          <span className="text-14px">
            <Icons.checkCircle
              className={isExpense ? "text-exp" : "text-inc"}
            />
          </span>
          <span>Total {isExpense ? "Expense" : "Income"}</span>
          <HorizontalDivider className="bg-white" />
          Rs.
          <span className={isExpense ? "text-exp" : "text-inc"}>
            {amountFloat(TotalExpenseYear)}
          </span>
        </Flexrow>
      </>
    ),
    subtext: `Graph of ${isExpense ? "Expenses" : "Income"} in Year by Month`,
    footertext: `Showing Total ${isExpense ? "Expense" : "Income"} of Each Month in a Year `,
  };

  /** ============================================================ */

  return (
    <>
      <Flexcol>
        {/** NOTE - filter to select year to dsplay graph and budget info */}
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense={isExpense} title={"Select Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={String(CurrentYear())}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>

        {/* <Flexrow>
          <MinMaxStrip data={monthMAX} isExpense isMax />
          <MinMaxStrip data={monthMIN} isExpense isMin />
        </Flexrow> */}
        {/** NOTE - GRAPH SECTION  */}
        <Flexrow>
          <SingleBarChart
            barInfo={barInfo}
            chartInfo={chartInfo}
          ></SingleBarChart>
        </Flexrow>
      </Flexcol>
      {/** NOTE - BUDGET ANALYSIS SECTION
       *  only display if conditions are true
       */}
      {isAnalysis && (
        <>
          {/*  <Card className="shadow-shadowBlack border-br1 bg-gradTop2 flex flex-col gap-0.5 border px-12 py-10 text-white shadow-md">
            <Flexcol>
              <Flexrow className="items-center gap-2 pb-5">
                <GraphTitleSquare className={"bg-budget"} />
                <span className="mr-2.5 font-medium"> Ratio - {year}</span>
                <FlexrowStrip className="text-14px gap-1.25">
                  <span className="text-14px">
                    <Icons.checkCircle className="text-budget" />
                  </span>
                  <span>Total Budget</span>
                  <HorizontalDivider className="bg-white" />
                  Rs.
                  <span className="text-budget">
                    {amountFloat(TotalBudgetYear)}
                  </span>
                </FlexrowStrip>
                <FlexrowStrip className="text-14px gap-1.25">
                  <span className="text-14px">
                    <Icons.checkCircle className="text-exp" />
                  </span>
                  <span>Total Expense</span>
                  <HorizontalDivider className="bg-white" />
                  Rs.
                  <span className="text-exp">
                    {amountFloat(TotalExpenseYear)}
                  </span>
                </FlexrowStrip>
                <FlexrowStrip className="text-14px gap-1.25">
                  <span className="text-14px">
                    <Icons.checkCircle className="text-white" />
                  </span>
                  <span>{BE_Percent}%</span>
                  <span className="text-14px">
                    {BE_Percent < 0 && <Icons.graphdown className="text-gg" />}
                    {BE_Percent > 0 && <Icons.graphup className="text-rr" />}
                  </span>
                </FlexrowStrip>
              </Flexrow>

              {BudgetRange.map((br) => (
                <>
                  <Flexcol>
                    <Flexrow className="items-center justify-between gap-2 py-2.5">
                      <span
                        className={`text-14px min-w-[70px] cursor-pointer text-right font-medium ${br.start === CurrentMonth() && `bg-exp rounded-[5px] !text-center text-white`}`}
                      >
                        {getMonthName(br.start, "MMMM")}
                      </span>
                      <TimelineDots range={br} />
                      <span
                        className={`text-14px min-w-[70px] cursor-pointer text-left font-medium ${br.end === CurrentMonth() && `bg-exp rounded-[5px] !text-center text-white`}`}
                      >
                        {getMonthName(br.end, "MMMM")}
                      </span>
                    </Flexrow>
                    <Flexrow className={"flex-wrap justify-center"}>
                      <BudgetRangeMonths
                        range={br}
                        combo={BudgetExpenseCombo}
                        isExpense={isExpense}
                      />
                    </Flexrow>
                  </Flexcol>
                </>
              ))}
            </Flexcol>
          </Card> */}

          <Flexrow>
            {isExpense && TotalBudgetYear && (
              <BudgetExpenseTable data={BudgetExpenseCombo} />
            )}
            {!isExpense && <IncomeExpenseTable data={IncomeExpenseCombo} />}
            <Flexrow className={"w-max"}>
              <Flexcol>
                {isExpense && TotalBudgetYear && (
                  <>
                    <TotalCardForYear isExpense year={year} />
                    <TotalBudgetCard year={year} />
                    <TotalCardForYear isAnalysis year={year} />
                  </>
                )}
                {!isExpense && (
                  <>
                    <TotalCardForYear year={year} />
                    <TotalCardForYear isExpense year={year} />
                  </>
                )}
              </Flexcol>
            </Flexrow>
          </Flexrow>

          {per !== null && (
            <>
              <FlexrowStrip className="text-14px gap-1.25">
                <span>Comparatively in {year} </span>
                <HorizontalDivider className="bg-white" />
                <span className="text-14px">
                  <Icons.checkCircle
                    className={`${isExpense ? "text-budget" : "text-inc"}`}
                  />
                </span>
                <span> You are </span>
                <span>
                  {diff > 0 && (isExpense ? "Under Budget" : "Under Spending")}
                  {diff < 0 && (isExpense ? "Over Budget" : "Over Spending")}
                  {diff == 0 && "Break Even"}
                </span>
                <HorizontalDivider className="bg-white" />
                <span>
                  {diff > 0 && "You Saved"}
                  {diff < 0 && "Your Over Spent"}
                </span>
                <span className="text-12px">
                  <Icons.rupee />
                </span>
                <span
                  className={`${diff > 0 && "text-gg"} ${diff < 0 && "text-rr"} ${diff == 0 && "text-budget"}`}
                >
                  {amountFloat(diff)}
                </span>
                <HorizontalDivider className="bg-white" />
                i.e
                <span
                  className={`${per < 0 && "text-gg"} ${per > 0 && "text-rr"} ${per == 0 && "text-budget"}`}
                >
                  {per} %
                </span>
                <span className="text-12px">
                  {per < 0 && <Icons.graphdown className="text-gg" />}
                  {per > 0 && <Icons.graphup className="text-rr" />}
                </span>
              </FlexrowStrip>
            </>
          )}
        </>
      )}
    </>
  );
};
export const GraphTitleSquare = ({ style, className }) => {
  return (
    <div style={style} className={cn("size-4 rounded-xs", className)}></div>
  );
};

export const TimelineDots = ({ range }) => {
  const numDots = range.end - range.start - 1;
  const dots = Array.from({ length: numDots }, (_, i) => range.start + 1 + i);

  return (
    <Flexrow className="relative flex flex-1 items-center justify-evenly px-2">
      <div className="border-budget absolute top-1/2 right-0 left-0 z-0 -translate-y-1/2 border-[0.5px] border-t"></div>
      {dots.map((d) => (
        <>
          <TooltipStrip
            className={"font-medium"}
            content={getMonthName(d, "MMMM")}
          >
            <div
              key={d}
              className={`z-10 size-3 rounded-full ${d === CurrentMonth() ? `bg-exp size-4 border-2 border-white` : `bg-budget`}`}
            ></div>
          </TooltipStrip>
        </>
      ))}
    </Flexrow>
  );
};

export const BudgetRangeMonths = ({ range, combo, isExpense }) => {
  const m = Array.from(
    { length: range.end - range.start + 1 },
    (_, i) => range.start + i,
  );
  const BE = combo?.filter((c) => m.includes(c.id)) ?? [];

  return (
    <>
      <BudgetPercentStrip isExpense={isExpense} data={BE} />
    </>
  );
};

export default SingleYearGraph;
