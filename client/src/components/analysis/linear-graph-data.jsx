import { useMemo, useState } from "react";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import SingleBarChart from "../charts/linear-graph-code";

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

export const LinearGraphData = ({ isExpense, isIncome, isAnalysis }) => {
  //
  const { ExpenseGraphData, IncomeGraphData } = useSelector(selectGraphData);
  const {
    ExpenseOfYear,
    IncomeOfYear,
    ExpenseOfMonth,
    IncomeOfMonth,
    ExpenseInLastMonths,
    IncomeInLastMonths,
    ExpenseInLastDays,
    IncomeInLastDays,
  } = useTotalConfig();

  const currentFilter = useSelector(selectCurrentFilter);
  const FilterYear = Number(currentFilter.values.year);
  const FilterMonth = Number(currentFilter.values.month);
  const FilterType = currentFilter.type;

  const { GraphTitle, GraphSubText, GraphFootText, TitleTotal, isArea } =
    useMemo(() => {
      // --- Declare variables with default values ---
      let GraphTitle = "";
      let GraphSubText = "";
      let GraphFootText = "";
      let TitleTotal = 0;
      let isArea = false;

      // --- Determine text and totals based on FilterType ---
      switch (FilterType) {
        case filterTypes.BY_YEAR:
        case filterTypes.THIS_YEAR:
          GraphTitle = `${isExpense ? "Expense" : "Income"} in Year ${FilterYear}`;
          GraphSubText = `Tracking monthly ${isExpense ? "expenses" : "income"} for ${FilterYear}.`;
          GraphFootText = `Showing total ${isExpense ? "expenses" : "income"} recorded each month.`;
          // Get the yearly total from the specific selectors
          TitleTotal = isExpense ? ExpenseOfYear : IncomeOfYear;
          break;

        case filterTypes.BY_MONTH:
        case filterTypes.THIS_MONTH:
          const monthName = getMonthName(FilterMonth, "MMMM");
          GraphTitle = `${isExpense ? "Expense" : "Income"} in ${monthName}`;
          GraphSubText = `Tracking daily ${isExpense ? "expenses" : "income"} for ${monthName}, ${FilterYear}.`;
          GraphFootText = `Showing total ${isExpense ? "expenses" : "income"} recorded each Day.`;
          // Get the monthly total from the specific selectors
          TitleTotal = isExpense ? ExpenseOfMonth : IncomeOfMonth;
          isArea = true;
          break;

        case filterTypes.LAST_9_MONTHS:
        case filterTypes.LAST_6_MONTHS:
        case filterTypes.LAST_3_MONTHS:
          // Determine the specific number of months
          const numMonths =
            FilterType === filterTypes.LAST_9_MONTHS
              ? 9
              : FilterType === filterTypes.LAST_6_MONTHS
                ? 6
                : 3;
          GraphTitle = `${isExpense ? "Expense" : "Income"} in Last ${numMonths} Months`;
          GraphSubText = `Tracking Monthly ${isExpense ? "expenses" : "income"} of Last ${numMonths} Months`;
          GraphFootText = `Showing total ${isExpense ? "expenses" : "income"} recorded each month.`;
          // Calculate total by summing the graph data for this range

          TitleTotal = isExpense ? ExpenseInLastMonths : IncomeInLastMonths;
          break;

        case filterTypes.LAST_30_DAYS:
        case filterTypes.LAST_15_DAYS:
        case filterTypes.LAST_7_DAYS:
          // Determine the specific number of days
          const numDays =
            FilterType === filterTypes.LAST_30_DAYS
              ? 30
              : FilterType === filterTypes.LAST_15_DAYS
                ? 15
                : 7;
          GraphTitle = `${isExpense ? "Expense" : "Income"} in Last ${numDays} Days`;
          GraphSubText = `Tracking Daily ${isExpense ? "expenses" : "income"} of Last ${numDays} Days`;
          GraphFootText = `Showing total ${isExpense ? "expenses" : "income"} recorded each day.`;
          // Calculate total by summing the graph data for this range
          TitleTotal = isExpense ? ExpenseInLastDays : IncomeInLastDays;

          isArea = true;

          break;

        // Add cases for other filter types if needed
        // case filterTypes.ALL_TIME: ...
        // case filterTypes.CUSTOM_DATES: ...

        default:
          // Handle any unexpected filter types
          GraphTitle = "Select a Filter";
          break;
      }

      return { GraphTitle, GraphSubText, GraphFootText, TitleTotal, isArea };
    }, [
      // Ensure ALL dependencies used in the switch are listed
      FilterType,
      FilterYear,
      FilterMonth,
      isExpense,
      ExpenseOfYear,
      IncomeOfYear,
      ExpenseOfMonth,
      IncomeOfMonth,
      ExpenseInLastMonths, // Add data for range filters
      IncomeInLastMonths, // Add data for range filters
      ExpenseInLastDays, // Add data for range filters
      IncomeInLastDays, // Add data for range filters
      // filterTypes is usually constant, but include if needed
    ]);

  /** ============================================================ */

  const textStyle = (isExpense && "text-exp-a3") || (isIncome && "text-inc-a3");
  const bgStyle = (isExpense && "bg-exp-a3") || (isIncome && "bg-inc-a3");

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
    data: (isExpense && ExpenseGraphData) ?? (isIncome && IncomeGraphData),
    label: (isExpense && "Expense") || (isIncome && "Income"),
    color:
      (isExpense && "var(--color-exp-a1)") ||
      (isIncome && "var(--color-inc-a2)"),
  };

  const chartInfo = {
    title: (
      <>
        <Flexrow className={"items-center gap-1.25"}>
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

  //? Check if ANY item in the data array has an amount greater than 0 if true then graph will show else not
  const hasDataPoints = barInfo.data?.some((item) => item.Amount > 0);

  return (
    <>
      <Flexcol>
        {/** NOTE - GRAPH SECTION  */}
        {hasDataPoints ? (
          <SingleBarChart
            isArea={isArea}
            barInfo={barInfo}
            chartInfo={chartInfo}
          />
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
