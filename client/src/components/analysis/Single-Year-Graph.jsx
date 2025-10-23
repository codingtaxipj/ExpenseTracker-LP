import { useMemo, useState } from "react";
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
import { useFilterConfig } from "@/hooks/useFilterConfig";

import { selectGraphData } from "@/redux/selectors/graph-selector";
import { useSelector } from "react-redux";
import { filterTypes, selectCurrentFilter } from "@/redux/slices/filter-slice";
import { TotalOfSelectedMonth } from "@/redux/selectors/total-selector";

const SingleYearGraph = ({ isExpense, isAnalysis }) => {
  /** ============================================================ */

  /** ============================================================ */
  const { ExpenseGraphData, IncomeGraphData } = useSelector(selectGraphData);
  const { ExpenseOfYear, IncomeOfYear, ExpenseOfMonth, IncomeOfMonth } =
    useTotalConfig();

  const currentFilter = useSelector(selectCurrentFilter);
  const FilterYear = Number(currentFilter.values.year);
  const FilterMonth = Number(currentFilter.values.month);
  const FilterType = currentFilter.type;

  const { GraphTitle, GraphSubText, GraphFootText, TitleTotal } =
    useMemo(() => {
      let GraphTitle;
      let GraphSubText;
      let GraphFootText;
      let TitleTotal = 0;

      if (
        FilterType === filterTypes.BY_YEAR ||
        FilterType === filterTypes.THIS_YEAR
      ) {
        GraphTitle = isExpense
          ? `Expense in Year ${FilterYear}`
          : `Income in Year ${FilterYear}`;
        GraphSubText = `Tracking monthly ${isExpense ? "expenses" : "income"} for ${FilterYear}.`;
        GraphFootText = `Showing total ${isExpense ? "expenses" : "income"} recorded each month.`;
        TitleTotal = isExpense ? ExpenseOfYear : IncomeOfYear;
      }
      if (
        FilterType === filterTypes.BY_MONTH ||
        FilterType === filterTypes.THIS_MONTH
      ) {
        GraphTitle = isExpense
          ? `Expense in ${getMonthName(FilterMonth, "MMMM")}`
          : `Income in ${getMonthName(FilterMonth, "MMMM")}`;
        GraphSubText = `Tracking daily ${isExpense ? "expenses" : "income"} for ${getMonthName(FilterMonth, "MMMM")}, ${FilterYear}.`;
        GraphFootText = `Showing total ${isExpense ? "expenses" : "income"} recorded each Day.`;
        TitleTotal = isExpense ? ExpenseOfMonth : IncomeOfMonth;
      }
      return { GraphTitle, GraphSubText, GraphFootText, TitleTotal };
    }, [
      filterTypes,
      FilterType,
      FilterYear,
      FilterMonth,
      ExpenseOfYear,
      IncomeOfYear,
      ExpenseOfMonth,
      IncomeOfMonth,
      isExpense,
    ]);

  /** ============================================================ */

  const textStyle = isExpense ? "text-exp-a3" : "text-inc-a3";
  const bgStyle = isExpense ? "bg-exp-a3" : "bg-inc-a3";

  /** ============================================================ */

  /** ============================================================ */

  /* 
//NOTE - Income
  const IncomeEachMonth = useMemo(
    () => getMonthListOfYear(TotalByMonth_INC, FilterYear),
    [TotalByMonth_INC, FilterYear],
  );

  //NOTE - budget of each month of year
  const BudgetEachMonth = useMemo(
    () => getBudgetListOfYear(BudgetByMonth, FilterYear),
    [BudgetByMonth, FilterYear],
  );

  
  //NOTE - arry OBJ {id, month name, expense amount, budget ,its percent }
  const BudgetExpenseCombo = createBudgetWithExpense(
    BudgetEachMonth,
    ExpenseEachMonth,
  );

  const IncomeExpenseCombo = createIncomeWithExpense(
    IncomeEachMonth,
    ExpenseEachMonth,
  );

  //NOTE - gets the total budget of year
  const TotalBudgetYear = getTotalBudgetOfYear(BudgetByMonth, FilterYear);

  const TotalIncomeYear = getTotalOfYear(TotalByYear_INC, FilterYear);

  const IE_Difference = TotalIncomeYear - TotalExpenseYear;
  const IE_Percent = getBudgetExpPercent(TotalIncomeYear, TotalExpenseYear);

  const BE_Difference = TotalBudgetYear - TotalExpenseYear;

  const BE_Percent = TotalBudgetYear
    ? getBudgetExpPercent(TotalBudgetYear, TotalExpenseYear)
    : null;

  const diff = isExpense ? BE_Difference : IE_Difference;
  const per = isExpense ? BE_Percent : IE_Percent; */

  /** ============================================================ */

  //NOTE - chart data for graph

  const barInfo = {
    data: isExpense ? ExpenseGraphData : IncomeGraphData,
    label: isExpense ? "Expense" : "Income",
    color: isExpense ? "var(--color-exp-a1)" : "var(--color-inc-a2)",
  };

  const chartInfo = {
    title: (
      <>
        <Flexrow className={"items-center gap-2"}>
          <GraphTitleSquare className={cn(bgStyle)} />
          <span className="mr-5">{GraphTitle}</span>
          <Icons.checkCircle className={cn(textStyle)} />
          <span>Rs.</span>
          <span className={cn(textStyle)}>{amountFloat(TitleTotal)}</span>
        </Flexrow>
      </>
    ),
    subtext: GraphSubText,
    footertext: GraphFootText,
  };

  /** ============================================================ */

  return (
    <>
      <Flexcol>
        {/** NOTE - GRAPH SECTION  */}
        {}
        {barInfo.data && barInfo.data.length > 0 ? (
          <SingleBarChart barInfo={barInfo} chartInfo={chartInfo} />
        ) : (
          <div className="text-slate-a4 py-10 text-center">
            No expense data available for this period.
          </div>
        )}
      </Flexcol>
      {/** NOTE - BUDGET ANALYSIS SECTION
       *  only display if conditions are true
       */}
      {isAnalysis && (
        <>
          <Flexrow className={"justify-between gap-10 py-3.5"}>
            {isExpense && TotalBudgetYear && (
              <BudgetExpenseTable data={BudgetExpenseCombo} />
            )}
            {!isExpense && <IncomeExpenseTable data={IncomeExpenseCombo} />}
            <Flexrow className={"w-max"}>
              <Flexcol
                className={cn(isExpense ? "justify-between" : "justify-center")}
              >
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
              className={`z-10 size-3 rounded-full ${d === CurrentMonth() ? `bg-exp-bsize-4 border-2 border-white` : `bg-budget`}`}
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
