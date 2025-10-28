import { LinearGraphCode } from "../charts/linear-graph-code";
import Flexrow from "../section/flexrow";
import Flexcol from "../section/flexcol";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import { useGraphConfig } from "@/hooks/useGraphConfig";

export const LinearGraphData = ({ isExpense, isIncome, isAnalysis }) => {
  const {
    ExpenseGraphData,
    IncomeGraphData,
    GraphTitle,
    GraphSubText,
    GraphFootText,
    TitleTotal,
    isArea,
  } = useGraphConfig({ isExpense: isExpense });
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

  const GraphInfo = {
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
          <span className={cn(textStyle)}>
            {amountFloat(isExpense ? TitleTotal.e : TitleTotal.i)}
          </span>
        </Flexrow>
      </>
    ),
    subtext: GraphSubText,
    footertext: GraphFootText,
  };

  /** ============================================================ */

  //? Check if ANY item in the data array has an amount greater than 0 if true then graph will show else not
  const hasDataPoints = GraphInfo.data?.some((item) => item.Amount > 0);

  return (
    <>
      <Flexcol>
        {/** NOTE - GRAPH SECTION  */}
        {hasDataPoints ? (
          <LinearGraphCode
            isArea={isArea}
            graphInfo={GraphInfo}
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
    </>
  );
};
export const GraphTitleSquare = ({ style, className }) => {
  return (
    <div style={style} className={cn("size-4 rounded-xs", className)}></div>
  );
};
